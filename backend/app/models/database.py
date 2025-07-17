from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, relationship
from sqlalchemy.ext.declarative import declarative_base
from typing import List

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
    vehicle_type = Column(String)   # e.g. freight train, trailer
    capacity = Column(Float)    # e.g. in tons
    jobs = relationship("Job", back_populates="vehicle")

class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String)
    source_location = Column(String)
    destination_location = Column(String)
    scheduled_time = Column(DateTime)
    driver_id = Column(Integer, ForeignKey("users.id"))
    # driver = relationship("User", back_populates="jobs")
    driver: Mapped["User"] = relationship(back_populates="jobs")
    vehicle_id = Column(Integer, ForeignKey("vehicles.id"), nullable=True)
    driver_name = Column(String, nullable=True)    # Denormalized for convenience
    vehicle = relationship("Vehicle", back_populates="jobs")