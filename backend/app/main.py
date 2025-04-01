from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient
from odmantic import AIOEngine, Model, Field
from .routers import eventos
from .config.mongo import connect_to_mongo, close_mongo_connection
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="Eventos API",
                description="API para gestionar eventos",
                version="1.0.0",
                openapi_tags=[
                  {
                    "name": "Eventos",
                    "description": "Gestión de eventos"
                  }
              ])


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ruta para eventos
app.include_router(eventos.router)

@app.on_event("startup")
async def startup_db_client():
    from .config.mongo import connect_to_mongo
    engine = await connect_to_mongo()
    app.state.mongo_engine = engine

@app.on_event("shutdown")
async def shutdown_db_client():
  await close_mongo_connection()


