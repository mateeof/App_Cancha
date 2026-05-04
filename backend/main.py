from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware # IMPORTANTE
from database import supabase # Importamos el cliente que creamos arriba

app = FastAPI()
# Configura quién puede entrar a tu API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Permite que cualquier aplicación (como tu web o celular) entre
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def inicio():
    return {"mensaje": "Backend de App Canchas funcionando"}

@app.get("/canchas")
def obtener_canchas():
    # Le pedimos a Supabase: "Selecciona todo (*) de la tabla 'canchas'"
    response = supabase.table("canchas").select("*").execute()
    return response.data

@app.get("/jugadores")
def obtener_jugadores():
    # Consultamos la nueva tabla
    response = supabase.table("perfiles_jugadores").select("*").execute()
    return response.data