# Rejestracja i token endpoint
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, selectinload
from .. import schemas, crud, auth, database, models
from fastapi.security import OAuth2PasswordRequestForm
from ..config import settings

router = APIRouter(prefix="/users", tags=["users"])
@router.post("/register", response_model=schemas.UserOut)
def register(user_in: schemas.UserCreate, db: Session = Depends(database.get_db)):
    # Rejestracja: sprawdzamy czy email istnieje
    existing = crud.get_user_by_email(db, user_in.email)
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed = auth.get_password_hash(user_in.password)
    user = crud.create_user(db, email=user_in.email, password_hash=hashed)
    return user

@router.post("/token", response_model=schemas.Token, tags=["auth"])
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    user = crud.get_user_by_email(db, form_data.username)
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect credentials")
    token = auth.create_access_token({"user_id": user.id})
    return {"access_token": token, "token_type": "bearer"}




@router.get("/me/artworks", response_model=list[schemas.ArtworkWithReviews])
def get_my_artworks(
    db: Session = Depends(database.get_db),
    current_user=Depends(auth.get_current_user),
):
    arts = (
        db.query(models.Artwork)
        .options(selectinload(models.Artwork.reviews))
        .filter(models.Artwork.owner_id == current_user.id)
        .all()
    )
    return arts


@router.get("/me/reviews", response_model=list[schemas.ReviewWithArtwork])
def get_my_reviews(
    db: Session = Depends(database.get_db),
    current_user=Depends(auth.get_current_user)
):
    reviews = (
    db.query(models.Review)
    .options(selectinload(models.Review.artwork))
    .filter(models.Review.author_id == current_user.id)
    .order_by(models.Review.created_at.desc())
    .all()
    )
    return reviews

@router.get("/me/status", response_model=dict) 
def get_user_status(current_user=Depends(auth.get_current_user)):
  
    return {
        "email": current_user.email,
        "daily_upload_count": current_user.daily_upload_count,
        "daily_review_count": current_user.daily_review_count,
        "uploads_left": settings.MAX_DAILY_UPLOADS - current_user.daily_upload_count,
        "reviews_left": settings.MAX_DAILY_REVIEWS - current_user.daily_review_count,
    }