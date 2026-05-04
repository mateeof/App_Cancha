import os
from dotenv import load_dotenv
from supabase import create_client, Client

# 1. Cargamos las variables del archivo .env
load_dotenv()

# 2. Extraemos la URL y la Key que pegaste antes
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")

# 3. Creamos el "cliente" de Supabase. 
# Este es el objeto que usaremos para hacer consultas.
supabase: Client = create_client(url, key)