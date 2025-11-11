# app/schemas.py
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class MetricBase(BaseModel):
    energy_kwh: float
    water_m3: float
    waste_kg: float

class Metric(MetricBase):
    id: int
    timestamp: datetime  

    class Config:
        orm_mode = True

class CompanyBase(BaseModel):
    name: str
    sector: str
    location: str

class Company(CompanyBase):
    id: int
    metrics: Optional[List[Metric]] = []

    class Config:
        orm_mode = True
