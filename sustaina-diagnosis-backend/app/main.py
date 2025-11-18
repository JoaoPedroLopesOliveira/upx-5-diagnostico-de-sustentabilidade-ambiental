from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from .database import SessionLocal, engine, Base
from . import models, schemas
from fastapi.middleware.cors import CORSMiddleware
import random
from datetime import datetime,date, timedelta
from fastapi.responses import StreamingResponse
import io
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm

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
    

@app.post("/companies/", response_model=schemas.Company, status_code=201)
def create_company(company: schemas.CompanyCreate, db: Session = Depends(get_db)):
    """
    Cria uma nova empresa e gera 30 dias de métricas simuladas.
    """
    db_company_exists = db.query(models.Company).filter(models.Company.name == company.name).first()
    if db_company_exists:
        raise HTTPException(status_code=400, detail="Empresa com este nome já cadastrada")


    db_company = models.Company(
        name=company.name,
        location=company.location,
        sector=company.sector
    )
    db.add(db_company)
    
    db.flush()

    today = date.today()
    metrics_to_add = []
    for i in range(30):
        simulated_date = today - timedelta(days=i)
        
        new_metric = models.Metric(
            company_id=db_company.id,
            timestamp=simulated_date,
            energy_kwh=random.uniform(100, 1000), 
            water_m3=random.uniform((5, 200),2),   
            waste_kg=random.uniform((1, 50),2)     
        )
        metrics_to_add.append(new_metric)
    
    db.add_all(metrics_to_add)
    
 
    db.commit()
    
    db.refresh(db_company)
    
    return db_company

@app.delete("/companies/{company_id}/", status_code=204)
def delete_company(company_id: int, db: Session = Depends(get_db)):
    """Deleta uma empresa e todas as suas métricas associadas"""
    company = db.query(models.Company).filter(models.Company.id == company_id).first()
    if not company:
        raise HTTPException(status_code=404, detail="Empresa não encontrada")
    db.delete(company)
    db.commit()
    return

@app.get("/companies/{company_id}/report/")
def generate_pdf_report(company_id: int, db: Session = Depends(get_db)):
    """Gera um relatório PDF detalhado para download"""
    
    # 1. Busca os dados (mesma lógica do diagnóstico)
    company = db.query(models.Company).filter(models.Company.id == company_id).first()
    if not company:
        raise HTTPException(status_code=404, detail="Empresa não encontrada")
    metrics = company.metrics
    if not metrics:
        raise HTTPException(status_code=404, detail="Sem métricas para gerar relatório")

    avg_energy = sum(m.energy_kwh for m in metrics) / len(metrics)
    avg_water = sum(m.water_m3 for m in metrics) / len(metrics)
    avg_waste = sum(m.waste_kg for m in metrics) / len(metrics)

    energy_score = max(0, 100 - (avg_energy / 10))
    water_score = max(0, 100 - (avg_water / 5))
    waste_score = max(0, 100 - (avg_waste / 2))
    overall_score = (energy_score + water_score + waste_score) / 3
    
    if overall_score >= 85:
        classificacao = "Excelente"
    elif overall_score >= 70:
        classificacao = "Bom"
    elif overall_score >= 50:
        classificacao = "Médio"
    else:
        classificacao = "Insatisfatório"

    # 2. Configura o PDF
    buffer = io.BytesIO()
    c = canvas.Canvas(buffer, pagesize=A4)
    width, height = A4
    
    # Cabeçalho
    c.setFont("Helvetica-Bold", 18)
    c.drawString(2 * cm, height - 2 * cm, "Relatório de Sustentabilidade Industrial")
    
    c.setFont("Helvetica", 12)
    c.drawString(2 * cm, height - 3 * cm, f"Empresa: {company.name}")
    c.drawString(2 * cm, height - 3.5 * cm, f"Localização: {company.location} | Setor: {company.sector}")
    c.line(2 * cm, height - 4 * cm, width - 2 * cm, height - 4 * cm)

    # Resultados Gerais
    c.setFont("Helvetica-Bold", 14)
    c.drawString(2 * cm, height - 5.5 * cm, "Diagnóstico Geral")
    
    c.setFont("Helvetica", 12)
    c.drawString(2 * cm, height - 6.5 * cm, f"Pontuação de Sustentabilidade: {round(overall_score, 2)}")
    c.drawString(2 * cm, height - 7.2 * cm, f"Classificação: {classificacao}")

    # Detalhes das Métricas
    c.setFont("Helvetica-Bold", 14)
    c.drawString(2 * cm, height - 9 * cm, "Métricas Médias (30 Dias)")
    
    c.setFont("Helvetica", 12)
    c.drawString(3 * cm, height - 10 * cm, f"- Energia: {round(avg_energy, 2)} kWh")
    c.drawString(3 * cm, height - 10.7 * cm, f"- Água: {round(avg_water, 2)} m³")
    c.drawString(3 * cm, height - 11.4 * cm, f"- Resíduos: {round(avg_waste, 2)} kg")

    # Rodapé
    c.setFont("Helvetica-Oblique", 10)
    c.drawString(2 * cm, 2 * cm, "Gerado automaticamente pela Plataforma de Diagnóstico Sustentável.")

    c.showPage()
    c.save()

    # 3. Prepara o arquivo para envio
    buffer.seek(0)
    filename = f"Relatorio_{company.name.replace(' ', '_')}.pdf"
    
    return StreamingResponse(
        buffer, 
        media_type="application/pdf", 
        headers={"Content-Disposition": f"attachment; filename={filename}"}
    )