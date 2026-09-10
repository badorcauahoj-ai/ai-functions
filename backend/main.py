"""
AktRadar backend — persists risk classifications so the frontend
has real history instead of only in-memory React state.

Run:
    pip install -r requirements.txt
    uvicorn main:app --reload --port 8000
"""

import sqlite3
from contextlib import contextmanager
from datetime import datetime, timezone
from pathlib import Path
from typing import Literal

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

DB_PATH = Path(__file__).parent / "aktradar.db"

app = FastAPI(title="AktRadar API")

# The Vite dev server runs on 5173 by default.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


def init_db() -> None:
    with get_conn() as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS classifications (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                area TEXT NOT NULL,
                decision TEXT NOT NULL,
                discloses TEXT NOT NULL,
                level TEXT NOT NULL,
                created_at TEXT NOT NULL
            )
            """
        )
        conn.commit()


@contextmanager
def get_conn():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
    finally:
        conn.close()


Area = Literal["hr", "finance", "health", "support", "other"]
Decision = Literal["autonomous", "assists"]
Discloses = Literal["yes", "no"]
Level = Literal["high", "limited", "minimal"]

HIGH_RISK_AREAS = {"hr", "finance", "health"}


class ClassificationIn(BaseModel):
    area: Area
    decision: Decision
    discloses: Discloses
    level: Level


class ClassificationOut(ClassificationIn):
    id: int
    created_at: str


def server_side_level(area: Area, decision: Decision) -> Level:
    """
    Mirrors the frontend's classify() logic so a client can't just send
    an arbitrary 'level' and have it trusted blindly.
    """
    if area in HIGH_RISK_AREAS and decision == "autonomous":
        return "high"
    if area in HIGH_RISK_AREAS:
        return "limited"
    if area == "support":
        return "limited"
    return "minimal"


@app.on_event("startup")
def on_startup():
    init_db()


@app.get("/api/classifications", response_model=list[ClassificationOut])
def list_classifications():
    with get_conn() as conn:
        rows = conn.execute(
            "SELECT * FROM classifications ORDER BY id DESC LIMIT 100"
        ).fetchall()
        return [dict(row) for row in rows]


@app.post("/api/classifications", response_model=ClassificationOut)
def create_classification(payload: ClassificationIn):
    # Recompute the level server-side rather than trusting the client's.
    computed_level = server_side_level(payload.area, payload.decision)

    created_at = datetime.now(timezone.utc).isoformat()
    with get_conn() as conn:
        cur = conn.execute(
            """
            INSERT INTO classifications (area, decision, discloses, level, created_at)
            VALUES (?, ?, ?, ?, ?)
            """,
            (payload.area, payload.decision, payload.discloses, computed_level, created_at),
        )
        conn.commit()
        row_id = cur.lastrowid

    return {
        "id": row_id,
        "area": payload.area,
        "decision": payload.decision,
        "discloses": payload.discloses,
        "level": computed_level,
        "created_at": created_at,
    }


@app.delete("/api/classifications/{item_id}")
def delete_classification(item_id: int):
    with get_conn() as conn:
        cur = conn.execute("DELETE FROM classifications WHERE id = ?", (item_id,))
        conn.commit()
        if cur.rowcount == 0:
            raise HTTPException(status_code=404, detail="Not found")
    return {"deleted": item_id}
