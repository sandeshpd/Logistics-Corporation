from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# initialize database engine and create the database
DATABASE_URL = "sqlite:///./batabase.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autoflush = False, autocommit = False, bind = engine)
Base = declarative_base()

# fetch database connection
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()