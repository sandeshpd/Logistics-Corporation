from fastapi import APIRouter, Depends, status, Response, HTTPException
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from typing import List

from .. import session
from ..models import schemas, database
from ..security import hashing, oauth2

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

# retrieve all users
@router.get("", response_model=List[schemas.UserResponse], status_code= status.HTTP_200_OK)
def get_users(
    db:Session = Depends(session.get_db),
    current_user:schemas.UserBase = Depends(oauth2.get_current_user)
):
    user = db.query(database.User).all()
    return user

# retrieve user by id 
@router.get("/{id}", response_model=schemas.UserResponse)
def get_user_by_id(
    id:int, 
    db:Session = Depends(session.get_db),
    current_user:schemas.UserBase = Depends(oauth2.get_current_user)
):
    user = db.query(database.User).filter(database.User.id == id).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id {id} not found in the database."
        )
    
    return user

# create a user
@router.post("", status_code=status.HTTP_201_CREATED)
def create_user(
    request:schemas.UserBase, 
    db:Session = Depends(session.get_db),
    current_user:schemas.UserBase = Depends(oauth2.get_current_user)
):
    new_user = database.User(
        username = request.username,
        password = hashing.Hash.encrypt_password(request.password),
        full_name = request.full_name,
        role = request.role
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

# update a user
@router.put("/{id}", status_code=status.HTTP_202_ACCEPTED)
def update(
    id:int, 
    request:schemas.UserBase, 
    db:Session = Depends(session.get_db),
    current_user:schemas.UserBase = Depends(oauth2.get_current_user)
):
    updated_request = request.model_dump(exclude_unset=True)
    query = db.query(database.User).filter(database.User.id == id)

    if not query.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id {id} not found in the database."
        )
    
    query.update(updated_request)
    db.commit()

    return {
        "message": "Values updated. Please check out."
    }

# delete a user
@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def destroy(
    id:int, 
    db:Session = Depends(session.get_db),
    current_user:schemas.UserBase = Depends(oauth2.get_current_user)
):
    query = db.query(database.User).filter(database.User.id == id)

    if not query.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id {id} not found in the database."
        )
    
    query.delete()
    db.commit()

    return {
        "message": f"User with id {id} deleted."
    }