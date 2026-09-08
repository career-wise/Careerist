import uuid
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from sqlalchemy import Column, JSON
from datetime import datetime

class User(SQLModel, table=True):
    __tablename__ = "users"
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    email: str = Field(unique=True, index=True)
    hashed_password: str
    
    # Profile fields
    full_name: Optional[str] = None
    persona: Optional[str] = "high-school"
    onboarding_answers: Optional[dict] = Field(default={}, sa_column=Column(JSON))
    onboarding_completed_at: Optional[datetime] = None
    
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    # goals: List["Goal"] = Relationship(back_populates="user")
    # resumes: List["Resume"] = Relationship(back_populates="user")
    # recommendations: List["Recommendation"] = Relationship(back_populates="user")
    # events: List["Event"] = Relationship(back_populates="user")
