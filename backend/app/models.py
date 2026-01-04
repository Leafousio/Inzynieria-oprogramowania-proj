# Modele bazy danych
# Object-Relational Mapper

#+-------+ 1      * +----------+ 1      * +--------+
#| User  |---------| Artwork  |---------| Review |
#+-------+         +----------+         +--------+
#  |   ^               |   ^                 |   ^
#  |   |_______________|   |_________________|   |
#  |       (owner)         (artwork, author)     |
#  +---------------------------------------------+  

from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, func, Date, Index
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    # pola do śledzenia dziennych limitów
    daily_upload_count = Column(Integer, default=0)
    daily_review_count = Column(Integer, default=0)
    last_activity_date = Column(Date, default=func.current_date())
    artworks = relationship("Artwork", back_populates="owner")
    reviews = relationship("Review", back_populates="author")

class Artwork(Base):
    __tablename__ = "artworks"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    category = Column(String, nullable=False) # Dodaj tę linię
    owner_id = Column(Integer, ForeignKey("users.id"))
    blob_path = Column(String, nullable=False)
    title = Column(String, default="")

    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())
    owner = relationship("User", back_populates="artworks")
    reviews = relationship("Review", back_populates="artwork")

class Review(Base):
    __tablename__ = "reviews"
    id = Column(Integer, primary_key=True, index=True)
    artwork_id = Column(Integer, ForeignKey("artworks.id"), nullable=False, index=True)
    author_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    artwork = relationship("Artwork", back_populates="reviews")
    author = relationship("User", back_populates="reviews")

# Indeksy pomocnicze do szybkiego filtrowania/paginacji
Index('idx_artworks_owner_created', Artwork.owner_id, Artwork.uploaded_at)
Index('idx_reviews_author_created', Review.author_id, Review.created_at)