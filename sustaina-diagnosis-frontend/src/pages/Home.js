import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import styles from "../css/Home.module.css";

function Home() {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/companies/")
      .then((response) => setCompanies(response.data))
      .catch((error) => console.error("Erro ao buscar empresas:", error));
  }, []);

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.title}>Empresas Cadastradas</h1>
      
      {companies.length === 0 ? (
        <p className={styles.loading}>Nenhuma empresa cadastrada.</p>
      ) : (
        <ul className={styles.companyList}>
          {companies.map((company) => (
            <li
              key={company.id}
              className={styles.companyItem}
              onClick={() => navigate(`/diagnosis/${company.id}`)}
            >
              <div>
                <strong className={styles.companyName}>{company.name}</strong>
                <span className={styles.companyDetails}>
                  {company.sector} ({company.location})
                </span>
              </div>
              <span className={styles.viewMore}>Ver Diagnóstico &rarr;</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;