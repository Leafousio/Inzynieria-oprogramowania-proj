# operacje CRUD i optymalizacja liczników dziennych
from sqlalchemy import func
from sqlalchemy.orm import Session  
from . import models
from .config import settings
from datetime import date
from fastapi import HTTPException
from random import choice

#Licznik reset
def ensure_daily_reset(user: models.User):
    today = date.today()
    if user.last_activity_date != today:
        user.last_activity_date = today
        user.daily_upload_count = 0
        user.daily_review_count = 0

#guard1
def can_upload(user: models.User):
    ensure_daily_reset(user)
    if user.daily_upload_count >= settings.MAX_DAILY_UPLOADS:
        raise HTTPException(status_code=400, detail="Daily upload limit reached") #400 - bad request
    
#guard2
def can_review(user: models.User):
    ensure_daily_reset(user)
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


def get_artwork_for_user( db: Session, user_id: int, category: str):
    
    query = (
        db.query(
            models.Artwork.id,
            func.count(models.Review.id).label("review_count")
        )
        .outerjoin(models.Review, models.Artwork.id == models.Review.artwork_id)
        .filter(models.Artwork.owner_id != user_id)
        .group_by(models.Artwork.id)
    )

    if category:
        query = query.filter(models.Artwork.category == category)

    # krotki 
    artwork_counts = query.all()
    if not artwork_counts:
        raise HTTPException(status_code=404, detail="No artworks available")

    min_review_count = min(count for _, count in artwork_counts)
    candidate_ids = [
        artwork_id for artwork_id, count in artwork_counts if count == min_review_count
    ]
    chosen_id = choice(candidate_ids)
    return db.query(models.Artwork).filter(models.Artwork.id == chosen_id).first()