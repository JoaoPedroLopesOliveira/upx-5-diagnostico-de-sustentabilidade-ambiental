from .database import engine, Base, SessionLocal
from .models import Company, Metric
import random
import datetime

def create_db_and_tables():
    Base.metadata.create_all(bind=engine)

def seed_example_data():
    db = SessionLocal()
    try:
        db.query(Metric).delete()
        db.query(Company).delete()
        db.commit()

        companies = [
            Company(name="EcoTech Solutions", sector="Technology", location="San Francisco"),
            Company(name="GreenFarm Inc.", sector="Agriculture", location="Iowa"),
            Company(name="Solaris Energy", sector="Energy", location="Austin"),
            Company(name="UrbanRecycle Co.", sector="Waste Management", location="New York"),
        ]
        db.add_all(companies)
        db.commit()

        now = datetime.datetime.utcnow()
        for company in db.query(Company).all():
            # Gera 30 dias de métricas simuladas
            for days_ago in range(30, 0, -1):
                ts = now - datetime.timedelta(days=days_ago)
                metric = Metric(
                    company_id=company.id,
                    timestamp=ts,
                    energy_kwh=round(random.uniform(100, 1000), 2),
                    water_m3=round(random.uniform(5, 200), 2),
                    waste_kg=round(random.uniform(1, 50), 2),
                )
                db.add(metric)
        db.commit()
        print("Banco populado com dados simulados.")
    finally:
        db.close()

if __name__ == "__main__":
    create_db_and_tables()
    seed_example_data()
