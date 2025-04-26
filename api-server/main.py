from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# -----------------------------------------
# Database Setup (SQLite + SQLAlchemy)
# -----------------------------------------

DATABASE_URL = "sqlite:///./messages.db"

# Create SQLite engine with single-threaded flag
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# Create a database session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for SQLAlchemy models
Base = declarative_base()

# Define the Message model
class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(String, index=True)
    order = Column(Integer, index=True)

# Create the messages table if it doesn't exist
Base.metadata.create_all(bind=engine)

# -----------------------------------------
# FastAPI App Setup
# -----------------------------------------

app = FastAPI()

# Enable CORS for development (allow frontend to make requests)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify frontend domain here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for API input validation
class MessageCreate(BaseModel):
    content: str

class MessageUpdate(BaseModel):
    content: str
    order: int

class MessageReorder(BaseModel):
    id: int
    order: int

# -----------------------------------------
# API Endpoints
# -----------------------------------------

# GET /messages - return all messages sorted by order
@app.get("/messages", response_model=List[dict])
def get_messages():
    db = SessionLocal()
    messages = db.query(Message).order_by(Message.order).all()
    db.close()
    return [{"id": m.id, "content": m.content, "order": m.order} for m in messages]

# POST /messages - create a new message and assign it the next available order
@app.post("/messages", response_model=dict)
def create_message(message: MessageCreate):
    db = SessionLocal()

    # Determine the new message's order (append to end)
    last_order = db.query(Message).count()
    db_message = Message(content=message.content, order=last_order)

    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    db.close()

    return {
        "id": db_message.id,
        "content": db_message.content,
        "order": db_message.order
    }

# DELETE /messages/{message_id} - delete a message and reassign order of remaining messages
@app.delete("/messages/{message_id}")
def delete_message(message_id: int):
    db = SessionLocal()
    message = db.query(Message).filter(Message.id == message_id).first()

    if not message:
        db.close()
        raise HTTPException(status_code=404, detail="Message not found")

    db.delete(message)
    db.commit()

    # Reorder remaining messages to ensure order is sequential
    messages = db.query(Message).order_by(Message.order).all()
    for i, msg in enumerate(messages):
        msg.order = i

    db.commit()
    db.close()

    return {"detail": "Message deleted"}

# PUT /messages/{message_id} - update a message's content and order
@app.put("/messages/{message_id}", response_model=dict)
def update_message(message_id: int, message: MessageUpdate):
    db = SessionLocal()
    db_message = db.query(Message).filter(Message.id == message_id).first()

    if not db_message:
        db.close()
        raise HTTPException(status_code=404, detail="Message not found")

    db_message.content = message.content
    db_message.order = message.order

    db.commit()
    db.refresh(db_message)
    db.close()

    return {
        "id": db_message.id,
        "content": db_message.content,
        "order": db_message.order
    }

# Optional example to bulk reorder the messages
@app.put("/messages/reorder")
def reorder_messages(message_list: List[MessageReorder]):
    db = SessionLocal()
    for item in message_list:
        msg = db.query(Message).filter(Message.id == item.id).first()
        if msg:
            msg.order = item.order
    db.commit()
    db.close()
    return {"detail": "Messages reordered successfully"}
