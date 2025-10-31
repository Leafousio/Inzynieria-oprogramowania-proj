# Ustawienia połączenia do bazy i sesji SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from .config import settings

engine = create_engine( #dla mid traffic strony
   settings.DATABASE_URL,
        echo=False,
        future=True,
        pool_pre_ping=True,
        **({"pool_size": 20, "max_overflow": 30, "pool_recycle": 3600, "pool_timeout": 30} if "sqlite" not in settings.DATABASE_URL else {})   
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Dependency do FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
        db.commit()  
    except Exception:
        db.rollback()  
        raise
    finally:
        db.close()