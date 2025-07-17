from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from .. import session
from ..models import schemas, database
from ..security import hashing, token

router = APIRouter(
    tags=["Authentication"]
)

# endpoint for user login
@router.post("/login")
def login(request:OAuth2PasswordRequestForm = Depends(), db:Session = Depends(session.get_db)):
    user = db.query(database.User).filter(database.User.username == request.username).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Invalid username or password. Please try again after some time."
        )
    
    if not hashing.Hash.verify(request.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Invalid password. Please try again after some time."
        )
    
    # generate JWT token and return it
    access_token = token.create_access_token(data={"sub": user.username})
    
    return {"access_token": access_token, "token_type": "bearer"}