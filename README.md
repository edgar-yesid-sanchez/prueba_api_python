# Api CRUD eventos
Impletacion de unaAPi con funcinalidades de CRUD y consulta para filtar eventos
# imPlentaciones

Back-end => pyton - FastAPI
DB =>  Mongodb
DM => ODMantic

Front-end => Reactjs - creado con vite y JavaScript
Node => 20.0.0

##  Cómo ejecutar el proyecto


### 1 Ejecutar el backend (FastAPI)
Abre una terminal en la raiz y ejecuta:

```bash
cd backend

## Copia el archivo `.env.example` como `.env`:
cp .env.example .env

python -m venv env
.\env\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --port 5000 --reload
```
### 2 Ejecutar front (FastAPI)
Abre una segunda terminal en la raiz y ejecuta:

```bash
cd frontend
npm install  # Solo la primera vez
npm run dev
```
la api se podra consumir desde la pagina delplegada, 

Filtro de eventos (desde el selector de la interfaz)
En la parte superior derecha de la interfaz encontrarás un selector que te permite aplicar filtros a la lista de eventos:

- **Todos** → Muestra todos los eventos registrados, sin importar su estado ni gestion.
- **Requiere gestión** → Muestra solo los eventos cuyo estado es **"Revisado"** y cuya gestión es **"Requiere gestion"**.
- **Sin gestión** → Muestra solo los eventos cuyo estado es **"Revisado"** y cuya gestión es **"Sin gestion"**.

