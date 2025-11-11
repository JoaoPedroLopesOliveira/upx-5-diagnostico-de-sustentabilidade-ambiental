import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Home() {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/companies/")
      .then((response) => setCompanies(response.data))
      .catch((error) => console.error("Erro ao buscar empresas:", error));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Empresas Cadastradas</h1>
      {companies.length === 0 ? (
        <p>Nenhuma empresa cadastrada.</p>
      ) : (
        <ul>
          {companies.map((company) => (
            <li
              key={company.id}
              style={{
                border: "1px solid #ccc",
                margin: "10px",
                padding: "10px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
              onClick={() => navigate(`/diagnosis/${company.id}`)}
            >
              <strong>{company.name}</strong> — {company.sector} ({company.location})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
