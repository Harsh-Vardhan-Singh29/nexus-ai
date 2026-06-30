from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv(override=True)


class Settings:
    # ==========================
    # Application
    # ==========================

    APP_NAME = "NEXUS AI"
    APP_VERSION = "1.0.0"
    API_PREFIX = "/api/v1"

    # ==========================
    # AI Configuration
    # ==========================

    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
    GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")

    # ==========================
    # Database
    # ==========================

    DATABASE_URL = os.getenv("DATABASE_URL", "")

    # ==========================
    # Environment
    # ==========================

    ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
    DEBUG = ENVIRONMENT == "development"


settings = Settings()