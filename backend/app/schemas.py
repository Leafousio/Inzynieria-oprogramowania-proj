# Pydantic schemas (wejścia/wyjścia)
from datetime import datetime
from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional
from enum import Enum
import re

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    user_id: Optional[int] = None

class UserCreate(BaseModel):
    email: EmailStr
    password: str

    @validator('password')
    def password_validation(cls, v):
        errors = []
        if len(v) < 8:
            errors.append("minimum 8 znaków")
        if not re.search(r"[A-Z]", v):
            errors.append("jedna wielka litera")
        if not re.search(r"[0-9]", v):
            errors.append("jedna cyfra")
            
        if errors:

            raise ValueError(f"Hasło musi zawierać: {', '.join(errors)}")
        return v
    

class UserOut(BaseModel):
    id: int
    email: EmailStr

    class Config:
        orm_mode = True



class CategoryEnum(str, Enum):
    DIGITAL = "digital painting"
    TRADITIONAL = "traditional painting"
    PHOTOGRAPHY = "photography"
    SCULPTURE = "sculpture"
    CERAMICS = "ceramics"
    CRAFTS = "crafts"

class ArtworkCreate(BaseModel):
    title: str
    category: CategoryEnum
    
class ArtworkCreate(BaseModel):
    title: str
    category: CategoryEnum


class ArtworkOut(BaseModel):
    id: int
    owner_id: int
    blob_path: str
    title: str
    category: str

    class Config:
        orm_mode = True

class ReviewCreate(BaseModel):
    artwork_id: int
    content: str = Field(..., min_length=80)  

class ReviewOut(BaseModel):
    id: int
    artwork_id: int
    author_id: int
    content: str

    class Config:
        orm_mode = True

class ReviewWithArtwork(BaseModel):
    id: int
    content: str
    created_at: datetime
    artwork: ArtworkOut

    class Config:
        orm_mode = True


class ArtworkWithReviews(BaseModel):
    id: int
    title: str
    category: str
    blob_path: str
    reviews: list[ReviewOut]

    class Config:
        from_attributes = True