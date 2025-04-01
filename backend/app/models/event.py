from odmantic import Model
from typing import Optional

class EventModel(Model):
    nombre: str
    tipo: str
    descripcion: str
    fecha: str
    estado: str = "Pendiente por revisar"
    gestion: str = ''

class EventUpdate(Model):
  nombre: Optional[str]
  tipo: Optional[str]
  descripcion: Optional[str]
  fecha: Optional[str]
  estado: Optional[str]
  gestion: Optional[str]


