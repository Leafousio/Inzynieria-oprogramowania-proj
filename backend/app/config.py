#ładowanie zmiennych śrowowiskowych .env 
from pydantic_settings  import BaseSettings 

class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60*4 #4 godziny
    AZURE_STORAGE_CONNECTION_STRING: str = ""
    AZURE_CONTAINER_NAME: str = "artworks"
    MAX_DAILY_UPLOADS: int = 5
    MAX_DAILY_REVIEWS: int = 5

class Config:
    env_file = ".env"

settings = Settings()     