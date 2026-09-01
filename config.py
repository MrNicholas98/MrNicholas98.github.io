import os

class Settings:
    PROJECT_NAME: str = "Agentic Nick AI Core"
    VERSION: str = "1.0.0"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://localhost:5432/agentic_nick")
    QDRANT_HOST: str = os.getenv("QDRANT_HOST", "localhost")
    QDRANT_PORT: int = int(os.getenv("QDRANT_PORT", 6333))

settings = Settings()
