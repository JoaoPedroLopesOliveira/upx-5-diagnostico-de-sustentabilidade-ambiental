import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function Diagnosis() {
  const { id } = useParams();
  const [diagnosis, setDiagnosis] = useState(null);

  useEffect(() => {
    api.get(`/companies/${id}/diagnosis/`)
      .then((response) => setDiagnosis(response.data))
      .catch((error) => console.error("Erro ao buscar diagnóstico:", error));
  }, [id]);

  if (!diagnosis) {
    return <p style={{ padding: "20px" }}>Carregando diagnóstico...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Diagnóstico de Sustentabilidade</h1>
      <h2>{diagnosis.company_name}</h2>

      <p><strong>Pontuação Geral:</strong> {diagnosis.sustainability_score}</p>
      <p><strong>Classificação:</strong> {diagnosis.classificação}</p>

      <h3>Médias das Métricas</h3>
      <ul>
        <li><strong>Energia:</strong> {diagnosis["avarege metrics"].energy_kwh} kWh</li>
        <li><strong>Água:</strong> {diagnosis["avarege metrics"].water_m3} m³</li>
        <li><strong>Resíduos:</strong> {diagnosis["avarege metrics"].waste_kg} kg</li>
      </ul>
    </div>
  );
}

export default Diagnosis;
