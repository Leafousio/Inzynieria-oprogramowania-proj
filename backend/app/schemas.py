# Pydantic schemas (wejścia/wyjścia)
from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    user_id: Optional[int] = None

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    email: EmailStr

    class Config:
        orm_mode = True

class ArtworkCreate(BaseModel):
    title: Optional[str] = ""
    category: Optional[str] = ""

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
