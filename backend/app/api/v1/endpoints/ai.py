from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.ai.ai_service import ai_service
from app.ai.memory import memory
from app.database.database import get_db
from app.schemas.ai import (
    ChatRequest,
    ChatResponse,
)

router = APIRouter()


# -------------------------------------------------
# AI Chat
# -------------------------------------------------

@router.post(
    "/chat",
    response_model=ChatResponse,
)
async def chat(
    request: ChatRequest,
    db: Session = Depends(get_db),
):

    response = ai_service.chat(
        message=request.message,
        db=db,
    )

    return ChatResponse(
        response=response,
    )


# -------------------------------------------------
# AI Context
# -------------------------------------------------

@router.get("/context")
async def get_ai_context(
    db: Session = Depends(get_db),
):

    return ai_service.get_context(db)


# -------------------------------------------------
# Clear Conversation
# -------------------------------------------------

@router.post("/clear")
async def clear_chat():

    memory.clear()

    return {
        "success": True,
        "message": "Conversation cleared.",
    }