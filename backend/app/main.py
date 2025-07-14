from fastapi import FastAPI

from .routers import jobs, users, vehicles
from .session import engine
from .models import database

app = FastAPI()

database.Base.metadata.create_all(engine)

app.include_router(jobs.router)
app.include_router(users.router)
app.include_router(vehicles.router)