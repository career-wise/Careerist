import uuid
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from sqlalchemy import Column, JSON
from datetime import datetime

class Resume(SQLModel, table=True):
    __tablename__ = "resumes"
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="users.id", ondelete="CASCADE")
    content: dict = Field(default={}, sa_column=Column(JSON))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    # user: "User" = Relationship(back_populates="resumes")
