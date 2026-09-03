import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Define our strict vocabulary
const RECOMMENDATION_TYPES = ['course', 'resource', 'action_item', 'motivational_nudge', 'goal_suggestion'];

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { prompt, messages = [], userContext: clientUserContext } = await req.json();

    if (!prompt && messages.length === 0) {
      return new Response(JSON.stringify({ error: 'Prompt or messages required' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    const apiKey = Deno.env.get('GROQ_API_KEY');
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'GROQ_API_KEY is not set' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      });
    }

    // Initialize Supabase Client to get User Context
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
    const authHeader = req.headers.get('Authorization');
    
    let userProfile = null;
    let userId = null;
    let supabaseClient = null;

    if (authHeader) {
      supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
        global: { headers: { Authorization: authHeader } }
      });
      
      const { data: { user } } = await supabaseClient.auth.getUser();
      if (user) {
        userId = user.id;
        const { data: profile } = await supabaseClient
          .from('profiles')
          .select('persona, onboarding_answers')
          .eq('id', user.id)
          .single();
        
        userProfile = profile;

        // Fetch recent events (last 5)
        const { data: recentEvents } = await supabaseClient
          .from('events')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);

        // Fetch active recommendations
        const { data: activeRecs } = await supabaseClient
          .from('recommendations')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'active');

        userProfile = {
          ...profile,
          recent_events: recentEvents || [],
          active_recommendations: activeRecs || []
        };
      }
    }
    
    // Fallback to client-provided context if edge function auth fetch fails
    const finalUserContext = userProfile || clientUserContext;

    // Build the system prompt
    let systemPrompt = `You are Careerist AI, an expert, friendly, and highly conversational career mentor. You help students and professionals with career advice, resume building, interview preparation, skill development, and career transitions. 

IMPORTANT RULES FOR YOUR RESPONSES:
1. Be conversational, empathetic, and encouraging, like a real human mentor chatting with a student.
2. DO NOT use tables unless absolutely necessary to compare structured data. Prefer normal paragraphs and simple bullet points.
3. Be concise but warm. Avoid corporate jargon.`;
    
    if (finalUserContext) {
      systemPrompt += `\n\nContext about the user:\nPersona: ${finalUserContext.persona || 'Unknown'}\n`;
      if (finalUserContext.onboarding_answers) {
        systemPrompt += `Onboarding Details: ${JSON.stringify(finalUserContext.onboarding_answers)}\n`;
      }
      
      if (finalUserContext.recent_events && finalUserContext.recent_events.length > 0) {
        systemPrompt += `\nRecent User Events: ${JSON.stringify(finalUserContext.recent_events)}\n`;
        
        // Check for low-confidence interview completed recently
        const recentInterviews = finalUserContext.recent_events.filter((e: any) => e.event_type === 'interview_completed');
        if (recentInterviews.length > 0) {
          const latestInterview = recentInterviews[0];
          if (latestInterview.payload?.confidence && latestInterview.payload.confidence < 80) {
            systemPrompt += `\nCRITICAL INSTRUCTION: The user recently completed a mock interview with a low confidence score (${latestInterview.payload.confidence}%). IN YOUR VERY FIRST RESPONSE, YOU MUST proactively bring this up with encouragement and provide at least ONE concrete, specific tip for improving their confidence (e.g., eye contact, pacing, breathing). Do not wait for the user to mention it. Be empathetic but actionable.\n`;
          }
        }
      }

      if (finalUserContext.active_recommendations && finalUserContext.active_recommendations.length > 0) {
        systemPrompt += `\nActive Recommendations: ${JSON.stringify(finalUserContext.active_recommendations)}\n`;
      }
    }
    
    // Only tell it to use the tool if we can actually save it
    const canUseTools = Boolean(userId && supabaseClient);
    if (canUseTools) {
      systemPrompt += `\nIf the user mentions a struggle or a goal, you should use the create_recommendation tool to actively log it so other parts of the app can help them.`;
    }

    // Using openai/gpt-oss-120b - confirmed available on this Groq account
    const model = 'openai/gpt-oss-120b';

    const groqMessages = [
      { role: 'system', content: systemPrompt },
      ...messages
    ];
    
    // Fallback if there's no history passed
    if (prompt && messages.length === 0) {
      groqMessages.push({ role: 'user', content: prompt });
    }

    // Tool definition
    const tools = [
      {
        type: "function",
        function: {
          name: "create_recommendation",
          description: "Creates an actionable recommendation or logs a struggle when the user needs help.",
          parameters: {
            type: "object",
            properties: {
              type: {
                type: "string",
                enum: RECOMMENDATION_TYPES,
                description: "The type of recommendation."
              },
              payload: {
                type: "object",
                description: "Details of the recommendation, like { subject: 'math', note: 'struggling with algebra' }",
                additionalProperties: true
              },
              target_feature: {
                type: "string",
                description: "Which feature should handle this (e.g., 'study_succeed', 'dashboard', 'learn_develop', 'explorer')",
                enum: ['chat', 'dashboard', 'study_succeed', 'learn_develop', 'prepare_future', 'explorer']
              }
            },
            required: ["type", "payload", "target_feature"]
          }
        }
      }
    ];

    // Call Groq API
    let groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: groqMessages,
        tools: canUseTools ? tools : undefined,
        temperature: 0.7,
        max_tokens: 512,
      }),
    });

    if (!groqResponse.ok) {
      const errorData = await groqResponse.json();
      throw new Error(errorData.error?.message || 'Groq API error');
    }

    let data = await groqResponse.json();
    let responseMessage = data.choices?.[0]?.message;

    // Handle Function Call
    if (responseMessage?.tool_calls && responseMessage.tool_calls.length > 0) {
      for (const toolCall of responseMessage.tool_calls) {
        if (toolCall.function.name === 'create_recommendation') {
          try {
            const args = JSON.parse(toolCall.function.arguments);
            
            // Insert into Supabase
            if (supabaseClient && userId) {
              await supabaseClient.from('recommendations').insert({
                user_id: userId,
                type: args.type,
                payload: args.payload,
                source_feature: 'chat',
                target_feature: args.target_feature || 'dashboard',
                status: 'active'
              });
            }

            // Let the LLM know the tool succeeded
            groqMessages.push(responseMessage);
            groqMessages.push({
              role: 'tool',
              tool_call_id: toolCall.id,
              content: JSON.stringify({ success: true, message: 'Recommendation saved.' })
            });

          } catch (e) {
            console.error('Error executing tool call', e);
          }
        }
      }

      // Second call to get final response
      groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages: groqMessages,
          tools: canUseTools ? tools : undefined,
          temperature: 0.7,
          max_tokens: 512,
        }),
      });
      
      data = await groqResponse.json();
      responseMessage = data.choices?.[0]?.message;
    }

    const reply = responseMessage?.content || "I'm sorry, I didn't get a response. Please try again.";

    return new Response(
      JSON.stringify({ reply }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error processing request:', error);
    return new Response(
      JSON.stringify({ error: message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
