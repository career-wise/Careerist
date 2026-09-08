from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from ..core.database import get_session
from ..models.user import User
from .auth import get_current_user
from ..services.ai_service import client, MODEL_NAME
import json

router = APIRouter(prefix="/api/chat", tags=["chat"])

@router.post("/")
def chat_endpoint(payload: dict, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    prompt = payload.get("prompt", "")
    messages = payload.get("messages", [])
    user_context = payload.get("userContext", {})
    
    # Construct the Groq messages array
    groq_messages = [
        {
            "role": "system", 
            "content": f"You are a helpful career advisor AI. Here is the user's profile context: {json.dumps(user_context)}. Help them with their career goals."
        }
    ]
    
    # Add history
    for msg in messages:
        if msg.get("role") in ["user", "assistant"]:
            groq_messages.append({
                "role": msg["role"],
                "content": msg.get("content", "")
            })
            
    # Add new prompt
    if prompt:
        groq_messages.append({"role": "user", "content": prompt})
        
    try:
        chat_completion = client.chat.completions.create(
            messages=groq_messages,
            model=MODEL_NAME,
            temperature=0.7,
            max_tokens=2048,
        )
        
        reply = chat_completion.choices[0].message.content
        return {"response": reply}
    except Exception as e:
        print(f"Chat error: {e}")
        raise HTTPException(status_code=500, detail="AI response failed")

@router.post("/score-interview")
def score_interview(payload: dict, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    question = payload.get("question", "")
    transcript = payload.get("transcript", "")
    
    prompt = f"""
    You are an expert interview coach. The user was asked: "{question}"
    The user's response was: "{transcript}"
    
    Evaluate this response and return a JSON object with:
    - confidence (number 0-100)
    - voiceClarity (number 0-100)
    - feedback (string: constructive feedback on their answer)
    """
    
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You MUST return ONLY valid raw JSON with no markdown formatting."},
                {"role": "user", "content": prompt}
            ],
            model=MODEL_NAME,
            temperature=0.3,
            max_tokens=1000,
        )
        content = chat_completion.choices[0].message.content
        
        if content.startswith("```json"):
            content = content[7:-3]
        elif content.startswith("```"):
            content = content[3:-3]
            
        return json.loads(content.strip())
    except Exception as e:
        print(f"Scoring error: {e}")
        return {"confidence": 50, "voiceClarity": 50, "feedback": "Failed to generate feedback."}

@router.post("/generate-resume-bullets")
def generate_resume_bullets(payload: dict, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    role = payload.get("role", "")
    description = payload.get("description", "")
    
    prompt = f"""
    You are an expert resume writer. The user had the role "{role}" and described their work as:
    "{description}"
    
    Generate 3 professional, impactful resume bullet points for this experience.
    Return ONLY a JSON array of 3 strings. Example: ["Led a team...", "Developed a new...", "Increased revenue..."]
    """
    
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You MUST return ONLY valid raw JSON with no markdown formatting."},
                {"role": "user", "content": prompt}
            ],
            model=MODEL_NAME,
            temperature=0.7,
            max_tokens=1000,
        )
        content = chat_completion.choices[0].message.content
        if content.startswith("```json"):
            content = content[7:-3]
        elif content.startswith("```"):
            content = content[3:-3]
            
        return json.loads(content.strip())
    except Exception as e:
        print(f"Resume bullet error: {e}")
        raise HTTPException(status_code=500, detail="Failed to generate bullets")

@router.post("/generate-interview-questions")
def generate_interview_questions(payload: dict, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    target_role = payload.get("targetRole", "Software Engineer")
    is_technical = payload.get("isTechnical", True)
    type = payload.get("type", "job")
    
    prompt = f"""
    You are an expert interviewer. Generate 5 {'technical' if is_technical else 'behavioral'} interview questions for a {'college admissions' if type == 'college' else 'job'} interview for the role of {target_role}.
    Return ONLY a JSON object with a 'questions' array containing 5 strings.
    """
    
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You MUST return ONLY valid raw JSON with no markdown formatting."},
                {"role": "user", "content": prompt}
            ],
            model=MODEL_NAME,
            temperature=0.7,
            max_tokens=1000,
        )
        content = chat_completion.choices[0].message.content
        if content.startswith("```json"):
            content = content[7:-3]
        elif content.startswith("```"):
            content = content[3:-3]
            
        return json.loads(content.strip())
    except Exception as e:
        print(f"Interview questions error: {e}")
        return {"questions": ["Tell me about yourself.", "What are your strengths?", "What are your weaknesses?", "Why do you want this role?", "Do you have any questions for us?"]}
