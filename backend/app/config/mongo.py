from motor.motor_asyncio import AsyncIOMotorClient
from odmantic import AIOEngine
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME")

client = None
engine: AIOEngine = None

async def connect_to_mongo():
    global client, engine
    client = AsyncIOMotorClient(MONGO_URI)
    engine = AIOEngine(client=client, database=MONGO_DB_NAME)
    return engine 

async def close_mongo_connection():
    client.close()