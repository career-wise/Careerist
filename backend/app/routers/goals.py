from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List
import uuid

from ..core.database import get_session
from ..models.user import User
from ..models.goal import Goal
from .auth import get_current_user
from ..services.ai_service import generate_roadmap

router = APIRouter(prefix="/api/goals", tags=["goals"])

@router.get("/", response_model=List[Goal])
def get_goals(current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    goals = session.exec(select(Goal).where(Goal.user_id == current_user.id)).all()
    return goals

@router.post("/", response_model=Goal)
def create_goal(goal_in: dict, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    goal = Goal(**goal_in, user_id=current_user.id)
    session.add(goal)
    session.commit()
    session.refresh(goal)
    return goal

@router.patch("/{goal_id}", response_model=Goal)
def update_goal(goal_id: uuid.UUID, goal_in: dict, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    goal = session.get(Goal, goal_id)
    if not goal or goal.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Goal not found")
    
    for key, value in goal_in.items():
        setattr(goal, key, value)
    
    session.add(goal)
    session.commit()
    session.refresh(goal)
    return goal

@router.post("/roadmap/generate")
def generate_user_roadmap(current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    profile_data = {
        "persona": current_user.persona,
        "onboarding_answers": current_user.onboarding_answers
    }
    
    try:
        roadmap_items = generate_roadmap(profile_data)
        
        if "error" in roadmap_items:
            # Return dummy if AI failed (for local dev without API key)
            return {"success": True, "goals": roadmap_items}
            
        created_goals = []
        for idx, item in enumerate(roadmap_items):
            goal = Goal(
                user_id=current_user.id,
                title=item.get("title", f"Step {idx+1}"),
                description=item.get("description", ""),
                category=item.get("type", "skill"),
                priority="high" if idx == 0 else "medium",
                status="active" if idx == 0 else "pending",
                source_feature="roadmap_generator"
            )
            session.add(goal)
            created_goals.append(goal)
            
        session.commit()
        for goal in created_goals:
            session.refresh(goal)
            
        return {"success": True, "goals": created_goals}
    except Exception as e:
        print(f"Roadmap generation failed: {e}")
        raise HTTPException(status_code=500, detail="Failed to generate roadmap")
