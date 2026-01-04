# Punkt wejścia FastAPI
from fastapi import FastAPI
from .database import engine, Base
from .routes import users, artworks, reviews
from fastapi.middleware.cors import CORSMiddleware
from .utils.azure_blob import LOCAL_UPLOAD_DIR 
import os

if not os.path.exists(LOCAL_UPLOAD_DIR):
    os.makedirs(LOCAL_UPLOAD_DIR)


Base.metadata.create_all(bind=engine)

app = FastAPI(title="ArtReview Prototype - Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,                  
    allow_methods=["*"],                     
    allow_headers=["*"],                      
)

app.include_router(users.router)
app.include_router(artworks.router)
app.include_router(reviews.router)

