"""
FastAPI backend for the Giscademy prototype.

This application exposes simple endpoints for testing connectivity and to
demonstrate how you might wire up code execution and database queries.

In production you should implement proper sandboxing for the code
execution endpoint and add authentication, validation and error handling.
"""

import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import asyncpg

app = FastAPI(title="Giscademy API", version="0.1.0")

# Read database URL from environment or fallback to docker-compose default
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://giscademy_user:giscademy_pass@db:5432/giscademy",
)


@app.get("/")
async def read_root():
    """Root endpoint for health checking."""
    return {"message": "Giscademy API is running"}


class PythonCode(BaseModel):
    code: str


@app.post("/run/python")
async def run_python_code(payload: PythonCode):
    """
    Placeholder endpoint for executing Python code.

    For security reasons, this implementation does not execute arbitrary code.
    In a production system, send the code to the sandbox service defined in the
    docker-compose file. For now we simply return the code back to the client.
    """
    return {
        "input": payload.code,
        "output": "Sandbox functionality is not implemented in this prototype."
    }


class SQLQuery(BaseModel):
    query: str


@app.post("/run/sql")
async def run_sql(payload: SQLQuery):
    """
    Execute a SQL query against the PostGIS database.

    Only use this in a safe context. No sanitisation is performed.
    For complex applications, use prepared statements and ORM frameworks.
    """
    try:
        conn = await asyncpg.connect(DATABASE_URL)
        result = await conn.fetch(payload.query)
        rows = [dict(record) for record in result]
        await conn.close()
        return {"rows": rows}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))