from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from .database import SessionLocal, engine, Base
from . import models, schemas
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Diagnóstico de Sustentabilidade")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Bem vindo à API de Diagnóstico de Sustentabilidade"}

@app.get("/companies/", response_model=List[schemas.Company])
def get_companies(db: Session = Depends(get_db)):
    """Lista todas as empresas cadastradas"""
    return db.query(models.Company).all()

@app.get("/companies/{company_id}/metrics/", response_model=List[schemas.Metric])
def get_company_metrics(company_id: int, db: Session = Depends(get_db)):
    """Retorna as métricas de sustentabilidade de uma empresa específica"""
    company = db.query(models.Company).filter(models.Company.id == company_id).first()
    if not company:
        raise HTTPException(status_code=404, detail="Empresa não encontrada")
    return company.metrics

@app.get("/companies/{company_id}/diagnosis/")
def get_company_diagnosis(company_id: int, db: Session = Depends(get_db)):
    """"Retorna um diagnóstico de sustentabilidade com base nas métricas da empresa"""
    company = db.query(models.Company).filter(models.Company.id == company_id).first()
    if not company:
        raise HTTPException(status_code=404, detail="Empresa não encontrada")
    metrics = company.metrics
    if not metrics:
        raise HTTPException(status_code=404, detail="Nenhuma métrica encontrada para esta empresa")
    
    
    avg_energy = sum(m.energy_kwh for m in metrics) / len(metrics)
    avg_water = sum(m.water_m3 for m in metrics) / len(metrics)
    avg_waste = sum(m.waste_kg for m in metrics) / len(metrics)
    

    energy_score = max(0, 100 - (avg_energy / 10))
    water_score = max(0, 100 - (avg_water / 5))
    waste_score = max(0, 100 - (avg_waste / 2))
    
    overrall_score = (energy_score + water_score + waste_score) / 3
    
    if overrall_score >= 85:
        classificacao = "Excelente desempenho de sustentabilidade."
    elif overrall_score >= 70:
        classificacao = "Bom desempenho de sustentabilidade, mas há espaço para melhorias."
    elif overrall_score >= 50:
        classificacao = "Desempenho médio de sustentabilidade. Recomenda-se ações corretivas."
    else:
        classificacao = "Desempenho insatisfatório de sustentabilidade. Ações imediatas são necessárias."
    return {
        "company_id": company.id,
        "company_name": company.name,
        "avarege metrics":{
            "energy_kwh": round(avg_energy, 2),
            "water_m3": round(avg_water, 2),
            "waste_kg": round(avg_waste, 2),
        },
        "sustainability_score": round(overrall_score, 2),
        "classificação": classificacao
    }
    