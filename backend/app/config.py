#ładowanie zmiennych śrowowiskowych .env 
from pydantic_settings  import BaseSettings 
from pydantic import Field


class Settings(BaseSettings):
    #z wartościami dom. dla testów lokalnych
    DATABASE_URL: str = Field(default="sqlite:///./test.db", description="Database connection URL")
    SECRET_KEY: str = Field(default="test_secret_key", description="Secret key for JWT")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60*4 #4 godziny
    AZURE_STORAGE_CONNECTION_STRING: str = Field(default="", description="Azure Blob connection")
    AZURE_CONTAINER_NAME: str = Field(default="artworks", description="Azure Blob container name")
    MAX_DAILY_UPLOADS: int = Field(default=5, description="Daily upload limit")
    MAX_DAILY_REVIEWS: int = Field(default=5, description="Daily review limit")

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()