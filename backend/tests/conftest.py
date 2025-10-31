import os
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Tymczasowe zmienne środowiskowe dla Pydantic
os.environ["DATABASE_URL"] = "sqlite:///:memory:"
os.environ["SECRET_KEY"] = "testsecret"

from ..app.database import Base, get_db
from ..app.main import app

# Testowy engine SQLite w pamięci (bez pool_size i max_overflow)
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Override get_db dependency
def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

# Tworzenie wszystkich tabel w pamięci
Base.metadata.create_all(bind=engine)

@pytest.fixture(scope="session")
def client():
    with TestClient(app) as c:
        yield c