import uuid
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from datetime import datetime

class Goal(SQLModel, table=True):
    __tablename__ = "goals"
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="users.id", ondelete="CASCADE")
    title: str
    description: Optional[str] = None
    category: str
    target_date: Optional[datetime] = None
    status: str = Field(default="in-progress")
    progress: int = Field(default=0)
    priority: str = Field(default="medium")
    source_feature: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    # user: "User" = Relationship(back_populates="goals")
