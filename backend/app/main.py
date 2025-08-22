from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware

from .routers import authentication, jobs, users, vehicles
from .session import engine
from .models import database

app = FastAPI()

origins = [
    "http://localhost:5173/",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

# app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="app/templates")

@app.get("/", response_class=HTMLResponse)
def index(request: Request):
    return templates.TemplateResponse(request=request, name="index.html")

database.Base.metadata.create_all(engine)

app.include_router(authentication.router)
app.include_router(jobs.router)
app.include_router(users.router)
app.include_router(vehicles.router)