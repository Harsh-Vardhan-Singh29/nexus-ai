from fastapi import APIRouter, HTTPException
from google.oauth2 import id_token
from google.auth.transport import requests

router = APIRouter(prefix="/auth", tags=["Authentication"])

import os
from dotenv import load_dotenv

load_dotenv()

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")


@router.post("/google")
async def google_login(data: dict):

    token = data.get("token")

    try:
        info = id_token.verify_oauth2_token(
            token,
            requests.Request(),
            GOOGLE_CLIENT_ID,
        )

        return {
            "success": True,
            "user": {
                "name": info["name"],
                "email": info["email"],
                "picture": info["picture"],
            },
        }

    except Exception as e:
        print("GOOGLE ERROR:", e)
        raise HTTPException(401, str(e))