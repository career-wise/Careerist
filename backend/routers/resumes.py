from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List
import uuid

from ..core.database import get_session
from ..models.user import User
from ..models.resume import Resume
from .auth import get_current_user

router = APIRouter(prefix="/api/resumes", tags=["resumes"])

@router.get("/", response_model=List[Resume])
def get_resumes(current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    resumes = session.exec(select(Resume).where(Resume.user_id == current_user.id)).all()
    return resumes

@router.get("/{resume_id}", response_model=Resume)
def get_resume(resume_id: uuid.UUID, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    resume = session.get(Resume, resume_id)
    if not resume or resume.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Resume not found")
    return resume

@router.post("/", response_model=Resume)
def create_resume(resume_in: dict, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    resume = Resume(user_id=current_user.id, content=resume_in.get("content", {}))
    session.add(resume)
    session.commit()
    session.refresh(resume)
    return resume

@router.patch("/{resume_id}", response_model=Resume)
def update_resume(resume_id: uuid.UUID, resume_in: dict, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    resume = session.get(Resume, resume_id)
    if not resume or resume.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    if "content" in resume_in:
        resume.content = resume_in["content"]
        
    session.add(resume)
    session.commit()
    session.refresh(resume)
    return resume

@router.delete("/{resume_id}")
def delete_resume(resume_id: uuid.UUID, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    resume = session.get(Resume, resume_id)
    if not resume or resume.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Resume not found")
        
    session.delete(resume)
    session.commit()
    return {"success": True}
