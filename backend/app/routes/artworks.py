from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from .. import database, auth, crud, schemas
from ..config import settings
from ..utils.azure_blob import upload_file_to_blob


router = APIRouter(prefix="/artworks", tags=["artworks"])

@router.post("/upload", response_model=schemas.ArtworkOut)
def upload_artwork(
    title: str = "",
    category: str = "",
    file: UploadFile = File(...),
    db: Session = Depends(database.get_db),
    current_user = Depends(auth.get_current_user)
):
    # Sprawdzamy limity lokalne
    crud.can_upload(current_user)
    contents = file.file.read()
    url = upload_file_to_blob(contents, file.filename)
    artwork = crud.create_artwork(db, owner_id=current_user.id, blob_path=url, title=title, category=category)
    crud.increment_upload(current_user, db)
    return artwork

@router.get("/to-review", response_model=list[schemas.ArtworkOut])
def get_random(category: str = None, db: Session = Depends(database.get_db), current_user = Depends(auth.get_current_user)):
    arts = crud.get_artwork_for_user(db, current_user.id, category=category, limit=int(settings.MAX_DAILY_REVIEWS))
    return arts
