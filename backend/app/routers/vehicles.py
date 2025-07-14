from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..models import database, schemas
from .. import session

router = APIRouter(
    prefix="/vehicles",
    tags=["Vehicles"]
)

# retrieve all vehicles
@router.get("", response_model=List[schemas.VehicleResponse])
def get_vehicles(db:Session = Depends(session.get_db)):
    vehicle = db.query(database.Vehicle).all()
    return vehicle

# retrieve vehicle by id
@router.get("/{id}", response_model=schemas.VehicleResponse)
def get_vehicle_by_id(id:int, db:Session = Depends(session.get_db)):
    vehicle = db.query(database.Vehicle).filter(database.Vehicle.id == id).first()

    if not vehicle:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Vehicle with id {id} not found in the database."
        )
    
    return vehicle

# create new vehicle
@router.post("", status_code=status.HTTP_201_CREATED)
def create_vehicle(request:schemas.VehicleBase, db: Session = Depends(session.get_db)):
    new_vehicle = database.Vehicle(
        license_plate=request.license_plate,
        model=request.model,
        vehicle_type=request.vehicle_type,
        capacity=request.capacity,
    )
    db.add(new_vehicle)
    db.commit()
    db.refresh(new_vehicle)
    return new_vehicle

# update a vehicle
@router.put("/{id}", status_code=status.HTTP_202_ACCEPTED)
def update_vehicle(id:int, request:schemas.VehicleBase, db:Session = Depends(session.get_db)):
    updated_request = request.model_dump(exclude_unset=True)
    query = db.query(database.Vehicle).filter(database.Vehicle.id == id)

    if not query.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Vehicle with id {id} not found in the database."
        )
    
    query.update(updated_request)
    db.commit()

    return {
        "message": "Values updated. Please check out."
    }

# delete a vehicle
@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def destroy_vehicle(id:int, db:Session = Depends(session.get_db)):
    query = db.query(database.Vehicle).filter(database.Vehicle.id == id)

    if not query.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Vehicle with id {id} not found in the database."
        )
    
    query.delete()
    db.commit()

    return {
        "message": f"Vehicle with id {id} deleted."
    }