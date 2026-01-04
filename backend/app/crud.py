# operacje CRUD i optymalizacja liczników dziennych
import random
from sqlalchemy import func
from sqlalchemy.orm import Session  
from . import models
from .config import settings
from datetime import date
from fastapi import HTTPException
from random import choice

#Licznik reset
def reset_daily_limits_if_needed(user, db: Session):
    today = date.today()

    if user.last_activity_date != today:
        user.daily_upload_count = 0
        user.daily_review_count = 0
        user.last_activity_date = today
        db.commit()
        db.refresh(user)
#guard1
def can_upload(user: models.User, db: Session):
    reset_daily_limits_if_needed(user,db)
    if user.daily_upload_count >= settings.MAX_DAILY_UPLOADS:
        raise HTTPException(status_code=400, detail="Daily upload limit reached") #400 - bad request
    
#guard2
def can_review(user: models.User, db: Session):
    reset_daily_limits_if_needed(user,db)
    if user.daily_review_count >= settings.MAX_DAILY_REVIEWS:
        raise HTTPException(status_code=400, detail="Daily review limit reached")
    
#tylko po weryfikacji -> gdy upload artwork zaszedł pomyślnie      
def increment_upload(user: models.User, db: Session):
    user.daily_upload_count += 1
    db.commit()
    db.refresh(user)

#tylko po weryfikacji -> gdy upload review zaszedł pomyślnie    
def increment_review(user: models.User, db: Session):
    user.daily_review_count += 1
    db.commit()
    db.refresh(user)

def create_user(db: Session, email: str, password_hash: str):
    user = models.User(email=email, hashed_password=password_hash)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_artwork(db: Session, owner_id: int, blob_path: str, title: str, category: str):
    artwork = models.Artwork(owner_id=owner_id, blob_path=blob_path, title=title, category=category)
    db.add(artwork)
    db.commit()
    db.refresh(artwork)
    return artwork

def create_review(db: Session, artwork_id: int, author_id: int, content: str):
    review = models.Review(artwork_id=artwork_id, author_id=author_id, content=content)
    db.add(review)
    db.commit()
    db.refresh(review)
    return review

def get_artwork_for_user(db: Session, user_id: int, category: str = None):
    subquery = (
        db.query(models.Review.id)
        .filter(
            models.Review.artwork_id == models.Artwork.id,
            models.Review.author_id == user_id,
        )
        .exists()
    )

    query = (
        db.query(models.Artwork)
        .filter(models.Artwork.owner_id != user_id)
        .filter(~subquery)   
    )

    if category:
        query = query.filter(models.Artwork.category == category)

    candidates = query.all()

    if not candidates:
        raise HTTPException(status_code=404, detail="No artworks available")

    return random.choice(candidates)