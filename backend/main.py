import os
from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
import asyncpg

app = FastAPI(title="Giscademy API")

origins = [os.getenv("ALLOW_ORIGIN", "*")]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE_URL = os.getenv("DATABASE_URL", "")

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.post("/run/sql")
async def run_sql(payload: dict = Body(...)):
    sql = payload.get("sql", "")
    if not sql:
        return {"rows": []}
    conn = await asyncpg.connect(DATABASE_URL)
    try:
        rows = await conn.fetch(sql)
        return {"rows": [dict(r) for r in rows]}
    finally:
        await conn.close()

@app.post("/run/python")
async def run_python(payload: dict = Body(...)):
    # Placeholder: IKKE evaluer bruker-kode her i prod. Dette er bare eko.
    code = payload.get("code", "")
    return {"echo": code}
