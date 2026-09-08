import os
import json
from dotenv import load_dotenv
from groq import Groq

env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".env")
load_dotenv(env_path)

# We load the API key from the environment.
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

client = Groq(api_key=GROQ_API_KEY)
# We will use llama3-70b-8192 as requested earlier in the project.
MODEL_NAME = "llama3-70b-8192"

def _generate_json(prompt: str) -> dict:
    if not GROQ_API_KEY:
        # Return fallback dummy data if no key is provided
        return {"error": "GROQ_API_KEY not set", "fallback": True}
        
    chat_completion = client.chat.completions.create(
        messages=[
            {"role": "system", "content": "You are a helpful career guidance API. You MUST respond with ONLY raw JSON, with no markdown formatting, no code blocks, and no extra text."},
            {"role": "user", "content": prompt}
        ],
        model=MODEL_NAME,
        temperature=0.7,
        max_tokens=2048,
    )
    
    content = chat_completion.choices[0].message.content
    try:
        # Strip markdown if the model ignored instructions
        if content.startswith("```json"):
            content = content[7:-3]
        elif content.startswith("```"):
            content = content[3:-3]
        return json.loads(content.strip())
    except json.JSONDecodeError as e:
        print(f"Failed to parse JSON from Groq: {e}\nContent was: {content}")
        raise ValueError("Failed to parse AI response as JSON")

def generate_roadmap(profile_data: dict) -> list:
    prompt = f"""
    Create a 5-step career roadmap for a user with the following profile:
    {json.dumps(profile_data, indent=2)}
    
    Return a JSON array of 5 objects, where each object has:
    - title (string)
    - description (string)
    - type (string: "education", "experience", "skill", "networking", "project")
    - timeframe (string, e.g., "Months 1-3")
    - status (string: "pending", "active", "completed") - first one should be active, rest pending.
    """
    return _generate_json(prompt)

def generate_explorer_picks(profile_data: dict) -> dict:
    prompt = f"""
    Based on the following profile, suggest 3 colleges, 3 majors, and 3 career paths.
    {json.dumps(profile_data, indent=2)}
    
    Return a JSON object with three keys: 'colleges', 'majors', 'careers'.
    Each key should contain an array of 3 objects.
    Each object MUST have:
    - id (string, e.g., "col-1")
    - title (string)
    - description (string)
    - matchScore (number between 70 and 99)
    - tags (array of 3 strings)
    """
    return _generate_json(prompt)
