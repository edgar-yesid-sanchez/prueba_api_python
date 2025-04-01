# Api CRUD eventos



##  Cómo ejecutar el proyecto



### 1 Ejecutar el backend (FastAPI)
Abre una terminal en la raiz y ejecuta:

```bash
cd backend

## Copia el archivo `.env.example` como `.env`:
cp .env.example .env

python -m venv env
source env/bin/activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 5000 --reload
```
### 2 Ejecutar front (FastAPI)
Abre una segunda terminal en la raiz y ejecuta:

```bash
cd frontend
npm install  # Solo la primera vez
npm run dev

```
