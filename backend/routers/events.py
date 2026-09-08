from fastapi import APIRouter, Depends
from sqlmodel import Session
from ..core.database import get_session
from ..models.user import User
from ..models.event import Event
from .auth import get_current_user

router = APIRouter(prefix="/api/events", tags=["events"])

@router.post("/")
def log_event(event_in: dict, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    event = Event(
        user_id=current_user.id,
        event_type=event_in.get("event_type", "unknown"),
        payload=event_in.get("payload", {}),
        feature_source=event_in.get("feature_source", "unknown")
    )
    session.add(event)
    session.commit()
    session.refresh(event)
    return event
