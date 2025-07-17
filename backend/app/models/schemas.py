from pydantic import BaseModel
from typing import List
from datetime import datetime

# Base Models 
class UserBase(BaseModel):
    username:str
    password:str
    full_name:str
    role:str

class VehicleBase(BaseModel):
    license_plate:str
    model:str
    vehicle_type:str
    capacity:float

class JobBase(BaseModel):
    description:str
    source_location:str
    destination_location:str
    scheduled_time:datetime
    driver_id:int

class Login(BaseModel):
    username:str
    password:str

class Token(BaseModel):
    access_token:str
    token_type:str

class TokenData(BaseModel):
    username:str | None = None


# Response Models
class UserResponse(BaseModel):
    username:str
    full_name:str
    role:str
    jobs:List[JobBase]

class UserResponseOne(UserBase):
    username:str
    full_name:str
    role:str

class VehicleResponse(BaseModel):
    model:str
    vehicle_type:str
    capacity:float
    jobs:List[JobBase]

class JobResponse(JobBase):
    id:int
    source_location:str
    destination_location:str
    scheduled_time:datetime
    # Currently this is One-to-One relationship because I initially thought One job 
    # has only One driver, but drivers' shifts change in long journey.
    # FIXME: Change it in Many-to-Many relationship.
    driver:UserResponseOne    
