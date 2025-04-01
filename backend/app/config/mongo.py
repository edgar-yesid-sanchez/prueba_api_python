from motor.motor_asyncio import AsyncIOMotorClient
from odmantic import AIOEngine
import os
from dotenv import load_dotenv
from ..models.event import EventModel

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


async def seed_eventos(engine: AIOEngine):
    eventos_existentes = await engine.find(EventModel)
    if not eventos_existentes:
        print("Base vacia, creando eventos de prueba...")
        eventos_demo = [
            EventModel(
                nombre="Evento de Bienvenida",
                tipo="Social",
                descripcion="Evento inicial del sistema",
                fecha="2025-04-01",
                estado="Revisado",
                gestion="Sin gestión"
            ),
            EventModel(
                nombre="Reunión Técnica",
                tipo="Incidente",
                descripcion="Reporte de fallo en servidor",
                fecha="2025-04-02",
                estado="Revisado",
                gestion="Requiere gestión"
            ),
            EventModel(
                nombre="Capacitación",
                tipo="Educación",
                descripcion="Sesión de formación para nuevos usuarios",
                fecha="2025-04-03",
                estado="Pendiente por revisar"
            ),
            EventModel(
                nombre="Actualización de sistema",
                tipo="Mantenimiento",
                descripcion="Nueva versión del sistema",
                fecha="2025-04-04",
                estado="Revisado",
                gestion="Sin gestión"
            )
        ]

        for evento in eventos_demo:
            await engine.save(evento)

        print("Eventos de prueba creados")
    else:
        print(f"Ya se encontraron {len(eventos_existentes)} eventos")
