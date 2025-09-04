from pydantic import BaseModel
from typing import List
from datetime import date

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
    scheduled_time:date
    driver_id:int
    vehicle_id:int

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
    id:int
    username:str
    full_name:str
    role:str
    jobs:List[JobBase]

class UserResponseForJob(BaseModel):
    id:int
    username:str
    full_name:str
    role:str

class VehicleResponse(BaseModel):
    id:int
    license_plate:str
    model:str
    vehicle_type:str
    capacity:float
    jobs:List[JobBase]

class VehicleResponseForJob(VehicleBase):
    id:int
    license_plate:str
    model:str
    vehicle_type:str
    capacity:float

class JobResponse(JobBase):
    id:int
    source_location:str
    destination_location:str
    scheduled_time:date
    # Currently this is One-to-One relationship because I initially thought One job 
    # has only One driver, but drivers' shifts could change in long journey.
    # FIXME: Change it in Many-to-Many relationship.
    driver:UserResponseForJob
    vehicle:VehicleResponseForJob
