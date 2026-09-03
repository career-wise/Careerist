import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { question, transcript } = await req.json()

    if (!question || !transcript) {
      return new Response(
        JSON.stringify({ error: "Missing question or transcript" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const apiKey = Deno.env.get('GROQ_API_KEY')
    if (!apiKey) {
      throw new Error("GROQ_API_KEY not configured")
    }

    const systemPrompt = `You are an expert career coach evaluating an interview answer.
Question asked: "${question}"
Candidate's transcribed answer: "${transcript}"

Analyze the answer and provide a JSON response with the following keys exactly:
{
  "confidence": (integer 0-100 representing how confident and authoritative they sounded based on their vocabulary and phrasing, lower if they sound uncertain or use many weak words),
  "voiceClarity": (integer 0-100 representing how coherent and clear the thought process is in the transcript),
  "feedback": (a short string, 1-2 sentences, giving constructive feedback on their answer)
}

Respond ONLY with the raw JSON object. Do not wrap it in markdown block quotes.`;

    // Call Groq via fetch
    const response = await fetch(`https://api.groq.com/openai/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-8b-8192", // Use a fast groq model for structured output
        messages: [
          { role: "system", content: systemPrompt }
        ],
        temperature: 0.2, // Low temp for more consistent evaluation
      })
    })

    const groqData = await response.json()
    
    if (groqData.error) {
       console.error("Groq API Error:", groqData.error);
       throw new Error(groqData.error.message || "Groq API error");
    }

    const textResponse = groqData.choices?.[0]?.message?.content
    
    if (!textResponse) {
       throw new Error("Invalid response format from Groq");
    }

    // Parse the JSON
    let parsedResult;
    try {
      parsedResult = JSON.parse(textResponse.trim().replace(/^```json/g, "").replace(/```$/g, ""));
    } catch (e) {
      console.error("Failed to parse Groq output:", textResponse);
      // Fallback
      parsedResult = {
         confidence: 70,
         voiceClarity: 70,
         feedback: "Good attempt, but the AI could not fully parse the transcription."
      };
    }

    return new Response(
      JSON.stringify(parsedResult),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error("Error in score-interview:", error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
