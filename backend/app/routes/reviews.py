from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..  import database, auth, crud, schemas, models
from ..schemas import ReviewCreate

router = APIRouter(prefix="/reviews", tags=["reviews"])

def count_words(text: str) -> int:
    return len([w for w in text.split() if w.strip()])

@router.post("/", response_model=schemas.ReviewOut)
def post_review(review_in: ReviewCreate, db: Session = Depends(database.get_db), current_user = Depends(auth.get_current_user)):
    if count_words(review_in.content) < 80:
        raise HTTPException(status_code=400, detail="Review must contain at least 80 words")
    crud.can_review(current_user)
    artwork_id = review_in.artwork_id
    art = db.query(models.Artwork).filter(models.Artwork.id == artwork_id).first()
    if not art:
        raise HTTPException(status_code=404, detail="Artwork not found")
    review = crud.create_review(db, artwork_id=artwork_id, author_id=current_user.id, content=review_in.content)
    crud.increment_review(current_user, db)
    return review
