from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from .. import session
from ..models import database, schemas
from ..security import oauth2

router = APIRouter(
    prefix="/jobs",
    tags=["Jobs"]
)

# retrieve all jobs
@router.get("", response_model=List[schemas.JobResponse])
def get_jobs(
    db:Session = Depends(session.get_db), 
    current_user:schemas.UserBase = Depends(oauth2.get_current_user)
):
    job = db.query(database.Job).all()
    return job

# retrieve job by id
@router.get("/{id}", response_model=schemas.JobResponse)
def get_job_by_id(
    id:int, 
    db:Session = Depends(session.get_db), 
    current_user:schemas.UserBase = Depends(oauth2.get_current_user)
):
    job = db.query(database.Job).filter(database.Job.id == id).first()

    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Job with id {id} not found in the database."
        )
    
    return job

# create new job
@router.post("", status_code=status.HTTP_201_CREATED)
def create_job(
    request:schemas.JobBase, 
    db: Session = Depends(session.get_db), 
    current_user:schemas.UserBase = Depends(oauth2.get_current_user)
):
    new_job = database.Job(
        description=request.description,
        source_location=request.source_location,
        destination_location=request.destination_location,
        scheduled_time=request.scheduled_time,
        driver_id=request.driver_id
    )
    db.add(new_job)
    db.commit()
    db.refresh(new_job)
    return new_job

# update a job
@router.put("/{id}", status_code=status.HTTP_202_ACCEPTED)
def update(
    id:int, 
    request:schemas.JobBase, 
    db:Session = Depends(session.get_db),
    current_user:schemas.UserBase = Depends(oauth2.get_current_user)
):
    updated_request = request.model_dump(exclude_unset=True)
    query = db.query(database.Job).filter(database.Job.id == id)

    if not query.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Job with id {id} not found in the database."
        )
    
    query.update(updated_request)
    db.commit()

    return {
        "message": "Values updated. Please check out."
    }

# delete a job
@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def destroy(
    id:int, 
    db:Session = Depends(session.get_db),
    current_user:schemas.UserBase = Depends(oauth2.get_current_user)
):
    query = db.query(database.Job).filter(database.Job.id == id)

    if not query.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Job with id {id} not found in the database."
        )
    
    query.delete()
    db.commit()

    return {
        "message": f"Job with id {id} deleted."
    }