from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.database import create_db_and_tables
from .routers import auth, profiles, goals, recommendations, resumes, events, chat

app = FastAPI(title="CareerWise API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

app.include_router(auth.router)
app.include_router(profiles.router)
app.include_router(goals.router)
app.include_router(recommendations.router)
app.include_router(resumes.router)
app.include_router(events.router)
app.include_router(chat.router)

@app.get("/")
def root():
    return {"message": "Welcome to CareerWise API"}
