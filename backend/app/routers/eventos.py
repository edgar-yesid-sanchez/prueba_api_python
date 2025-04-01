from typing import List
from app.models.event import EventModel, EventUpdate
from odmantic import ObjectId
from fastapi import APIRouter, Request , HTTPException

router = APIRouter(prefix="/eventos",
                    tags=["Eventos"],
                    responses={404: {"message": "No encontrado"}}
                  )
                
# crear un evento
@router.post("/create", status_code=201, response_model=EventModel)
async def crear_evento(evento: EventModel, request: Request):
    engine = request.app.state.mongo_engine
    nuevo_evento = await engine.save(evento)
    return nuevo_evento

# Obtener todos los eventos
@router.get("/list", response_model=List[EventModel])
async def obtener_eventos(request: Request):
    engine = request.app.state.mongo_engine
    return await engine.find(EventModel)

# Obtener evento por ID
@router.get("/{evento_id}", response_model=EventModel)
async def obtener_evento(evento_id: ObjectId,request: Request):
    engine = request.app.state.mongo_engine
    evento = await engine.find_one(EventModel, EventModel.id == evento_id)
    if not evento:
        raise HTTPException(status_code=404, detail="Evento no encontrado")
    return evento

# Actualizar evento
@router.put("/update/{evento_id}", response_model=EventModel)
async def actualizar_evento(evento_id: ObjectId, evento: EventUpdate,request: Request):
    engine = request.app.state.mongo_engine
    evento_actual = await engine.find_one(EventModel, EventModel.id == evento_id)
    if not evento_actual:
        raise HTTPException(status_code=404, detail="Evento no encontrado")
  
    update_data = evento.dict(exclude_unset=True)
    update_data.pop("id", None)

    for key, value in update_data.items():
        setattr(evento_actual, key, value)
    
    await engine.save(evento_actual)
    return evento_actual

# Eliminar evento
@router.delete("/delete/{evento_id}")
async def eliminar_evento(evento_id: ObjectId,request: Request):
    engine = request.app.state.mongo_engine
    evento = await engine.find_one(EventModel, EventModel.id == evento_id)
    if not evento:
        raise HTTPException(status_code=404, detail="Evento no encontrado")
    
    await engine.delete(evento)
    return {"message": "Evento eliminado correctamente"}


@router.get("/revisados/{tipo_gestion}", response_model=List[EventModel])
async def listar_eventos_revisados_por_gestion(tipo_gestion: str, request: Request):
    engine = request.app.state.mongo_engine
    print("Tipo gestion",tipo_gestion)
    eventos = await engine.find(
        EventModel,
        (EventModel.estado == "Revisado") & (EventModel.gestion == tipo_gestion)
    )

    if not eventos:
        raise HTTPException(status_code=204, detail="Sin eventos")
    
    return eventos