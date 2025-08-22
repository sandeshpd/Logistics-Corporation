from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Date
from sqlalchemy.orm import Mapped, relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)
    full_name = Column(String)
    role = Column(String)   # E.g. driver, manager etc.
    jobs = relationship("Job", back_populates="driver")

class Vehicle(Base):
    __tablename__ = "vehicles"

    id = Column(Integer, primary_key=True, index=True)
    license_plate = Column(String, unique=True, index=True)
    model = Column(String)
    vehicle_type = Column(String)   # e.g. freight train, truck
    capacity = Column(Float)    # e.g. in tons
    jobs = relationship("Job", back_populates="vehicle")

class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String)
    source_location = Column(String)
    destination_location = Column(String)
    scheduled_time = Column(Date)   # FIXME: Modify in a way such that only DD/MM/YYYY is valid
    driver_id = Column(Integer, ForeignKey("users.id"))
    driver: Mapped["User"] = relationship(back_populates="jobs")
    vehicle_id = Column(Integer, ForeignKey("vehicles.id"))
    driver_name = Column(String, nullable=True)    # Denormalized for convenience
    vehicle:Mapped["Vehicle"] = relationship(back_populates="jobs")