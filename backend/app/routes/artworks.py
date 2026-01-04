import random
from fastapi import APIRouter, Depends, Form, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from .. import database, auth, crud, schemas
from ..config import settings
from .. import models
from ..utils.azure_blob import upload_file_to_blob


router = APIRouter(prefix="/artworks", tags=["artworks"])



@router.get("/categories", response_model=list[str])
def get_categories():
    return [category.value for category in schemas.CategoryEnum]

@router.post("/upload", response_model=schemas.ArtworkOut)
def upload_artwork(
    title: str = Form(...),
    category: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(database.get_db),
    current_user = Depends(auth.get_current_user)
):
    # Sprawdzamy limity lokalne
    crud.can_upload(current_user,db)
    contents = file.file.read()
    url = upload_file_to_blob(contents, file.filename)
    artwork = crud.create_artwork(db, owner_id=current_user.id, blob_path=url, title=title, category=category)
    crud.increment_upload(current_user, db)
    return artwork

@router.get("/random", response_model=schemas.ArtworkOut)
def get_random(
    category: str = None,
    db: Session = Depends(database.get_db),
    current_user = Depends(auth.get_current_user)
):
    crud.can_review(current_user, db)
    artwork =  crud.get_artwork_for_user(db, current_user.id, category)
    if not artwork:
        raise HTTPException(
            status_code=404,
            detail="No artworks available for review in this category"
        )
        
    return artwork

@router.get("/public-random", response_model=schemas.ArtworkOut)
def get_public_random_artwork(
    db: Session = Depends(database.get_db),
):
    artworks = db.query(models.Artwork).all()

    if not artworks:
        raise HTTPException(status_code=404, detail="No artworks available")

    return random.choice(artworks)