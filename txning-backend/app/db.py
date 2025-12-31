# 提供 get_db()
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base


DATABASE_URL = "postgresql+psycopg://myapp_user:123456@localhost:5432/myapp_dev"

print("DATABASE_URL_IN_USE =", DATABASE_URL)



engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
