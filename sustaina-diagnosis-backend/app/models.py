# app/models.py
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base
import datetime

class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    sector = Column(String, nullable=False)
    location = Column(String, nullable=False)

    metrics = relationship("SustainabilityMetric", back_populates="company", cascade="all, delete-orphan")
    

class Metric(Base):
    __tablename__ = "metrics"

    id = Column(Integer, primary_key=True, index=True)
    Company_id = Column(Integer, ForeignKey("companies.id"), nullable=False)
    energy_kwh = Column(Integer, nullable=False)
    water_m3 = Column(Integer, nullable=False)
    waste_kg = Column(Integer, nullable=False)
    timestamp = Column(String, default=datetime.datetime.utcnow().isoformat, nullable=False)
    
    Company = relationship("Company", back_populates="metrics")
   