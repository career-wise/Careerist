from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from ..core.database import get_session
from ..models.user import User
from .auth import get_current_user
from pydantic import BaseModel
from typing import Dict, Any

router = APIRouter(prefix="/api/profiles", tags=["profiles"])

class OnboardingData(BaseModel):
    persona: str = "high-school"
    onboarding_answers: Dict[str, Any] = {}

@router.get("/me")
def get_profile(current_user: User = Depends(get_current_user)):
    return current_user

@router.post("/onboarding")
def save_onboarding(data: OnboardingData, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    current_user.persona = data.persona
    current_user.onboarding_answers = data.onboarding_answers
    
    from datetime import datetime
    current_user.onboarding_completed_at = datetime.utcnow()
    
    session.add(current_user)
    session.commit()
    session.refresh(current_user)
    return current_user
