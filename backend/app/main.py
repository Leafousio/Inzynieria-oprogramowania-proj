# Punkt wejścia FastAPI
from fastapi import FastAPI
from .database import engine, Base
from .routes import users, artworks, reviews


# Tworzenie tabel (dla prototypu). W produkcji używaj Alembic.
Base.metadata.create_all(bind=engine)

app = FastAPI(title="ArtReview Prototype - Backend")

app.include_router(users.router)
app.include_router(artworks.router)
app.include_router(reviews.router)
