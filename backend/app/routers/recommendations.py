from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List
import uuid

from ..core.database import get_session
from ..models.user import User
from ..models.recommendation import Recommendation
from .auth import get_current_user
from ..services.ai_service import generate_explorer_picks

router = APIRouter(prefix="/api/recommendations", tags=["recommendations"])

@router.get("/active", response_model=List[Recommendation])
def get_active_recommendations(target_feature: str, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    query = select(Recommendation).where(
        Recommendation.user_id == current_user.id,
        Recommendation.status == 'active',
        Recommendation.target_feature == target_feature
    ).order_by(Recommendation.created_at.desc())
    
    recs = session.exec(query).all()
    return recs

@router.patch("/{rec_id}", response_model=Recommendation)
def update_recommendation(rec_id: uuid.UUID, rec_in: dict, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    rec = session.get(Recommendation, rec_id)
    if not rec or rec.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Recommendation not found")
    
    for key, value in rec_in.items():
        setattr(rec, key, value)
    
    session.add(rec)
    session.commit()
    session.refresh(rec)
    return rec

@router.post("/generate-picks")
def generate_picks(current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    profile_data = {
        "persona": current_user.persona,
        "onboarding_answers": current_user.onboarding_answers
    }
    
    try:
        picks = generate_explorer_picks(profile_data)
        
        # Deactivate existing active recommendations for explorer
        existing = session.exec(
            select(Recommendation).where(
                Recommendation.user_id == current_user.id,
                Recommendation.status == 'active',
                Recommendation.target_feature == 'explorer'
            )
        ).all()
        for ex in existing:
            ex.status = 'dismissed'
            session.add(ex)
            
        created_recs = []
        for type_key, items in picks.items():
            # type_key will be 'colleges', 'majors', 'careers'
            # Let's map it to singular 'college', 'major', 'career'
            mapped_type = type_key.rstrip('s')
            for item in items:
                rec = Recommendation(
                    user_id=current_user.id,
                    type=mapped_type,
                    source_feature="explorer_generator",
                    target_feature="explorer",
                    payload=item,
                    status="active"
                )
                session.add(rec)
                created_recs.append(rec)
                
        session.commit()
        for rec in created_recs:
            session.refresh(rec)
            
        return {"success": True, "recommendations": created_recs}
    except Exception as e:
        print(f"Picks generation failed: {e}")
        raise HTTPException(status_code=500, detail="Failed to generate picks")
