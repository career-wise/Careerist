import uuid
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from sqlalchemy import Column, JSON
from datetime import datetime

class Event(SQLModel, table=True):
    __tablename__ = "events"
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="users.id", ondelete="CASCADE")
    event_type: str
    payload: dict = Field(default={}, sa_column=Column(JSON))
    feature_source: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # user: "User" = Relationship(back_populates="events")
