# 数据库基础设施层  创建 engine / Session / get_db
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base
import os
from dotenv import load_dotenv
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
assert DATABASE_URL, "DATABASE_URL is None/empty. Check env vars."
print("DATABASE_URL_IN_USE =", DATABASE_URL)


engine = create_engine(DATABASE_URL) #engine = 数据库连接的“工厂 + 管理器”
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
#定义“以后创建出来的 db 会话长什么样”
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
# 给每一次请求，提供一个“干净、可关闭”的数据库会话

# yield db：把 db 交给上层使用

# finally db.close()：请求结束一定关闭连接