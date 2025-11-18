import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import styles from "../css/Diagnosis.module.css";
import { FaBolt, FaWater, FaRecycle, FaFilePdf } from 'react-icons/fa';


function Diagnosis() {
  const { id } = useParams();
  const [diagnosis, setDiagnosis] = useState(null);

  useEffect(() => {
    api.get(`/companies/${id}/diagnosis/`)
      .then((response) => setDiagnosis(response.data))
      .catch((error) => console.error("Erro ao buscar diagnóstico:", error));
  }, [id]);

  if (!diagnosis) {
    return <p className={styles.loading}>Carregando diagnóstico...</p>;
  }

  const handleDownloadPDF = () => {
    const pdfUrl = `${api.defaults.baseURL}/companies/${id}/report/`;
    window.open(pdfUrl, '_blank');
  };


  return (
    <div className={styles.diagnosisContainer}>
      <header className={styles.header}>
        <h1>Diagnóstico de Sustentabilidade</h1>
        <h2 className={styles.companyName}>{diagnosis.company_name}</h2>
      </header>

    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <button onClick={handleDownloadPDF} className={styles.pdfButton}>
          <FaFilePdf style={{ marginRight: '8px' }} />
          Baixar Relatório em PDF
        </button>
      </div>
 
      <section className={styles.metricsSection}>
        <h3>Médias de Consumo</h3>
        <ul className={styles.metricsList}>
          <li className={styles.metricItem}>
            <strong>Energia:</strong> {diagnosis["avarege metrics"].energy_kwh} kWh
          </li>
          <li className={styles.metricItem}>
            <strong>Água:</strong> {diagnosis["avarege metrics"].water_m3} m³
          </li>
          <li className={styles.metricItem}>
            <strong>Resíduos:</strong> {diagnosis["avarege metrics"].waste_kg} kg
          </li>
        </ul>
      </section>

      <section className={styles.scoreSection}>
        <div className={styles.scoreBox}>
          <span className={styles.scoreLabel}>Pontuação Geral</span>
          <span className={styles.scoreValue}>{diagnosis.sustainability_score}</span>
        </div>
        <div className={styles.scoreBox}>
          <span className={styles.scoreLabel}>Classificação</span>
          <span className={styles.classificationValue}>{diagnosis.classificação}</span>
        </div>
      </section>


      <section className={styles.tipsSection}>
        <h3>Recomendações de Melhoria</h3>
        <div className={styles.tipsGrid}>
          

          <div className={styles.tipCard}>
            <h4><FaBolt className={styles.tipIconEnergy} /> Energia</h4>
            <ul>
              <li>Substitua lâmpadas atuais por LED, que são mais eficientes.</li>
              <li>Instale sensores de presença em áreas de pouca circulação.</li>
              <li>Realize manutenções preventivas em motores e equipamentos.</li>
              <li>Considere a viabilidade de instalar painéis solares.</li>
            </ul>
          </div>


          <div className={styles.tipCard}>
            <h4><FaWater className={styles.tipIconWater} /> Água</h4>
            <ul>
              <li>Instale redutores de vazão em todas as torneiras e sanitários.</li>
              <li>Implemente um sistema de monitoramento para identificar vazamentos.</li>
              <li>Considere o reuso de água em processos industriais (água de reuso).</li>
              <li>Estude a implementação de um sistema de captação de água da chuva.</li>
            </ul>
          </div>


          <div className={styles.tipCard}>
            <h4><FaRecycle className={styles.tipIconWaste} /> Resíduos</h4>
            <ul>
              <li>Implemente um programa de coleta seletiva rigoroso.</li>
              <li>Adote a política de "papel zero", priorizando a digitalização.</li>
              <li>Revise processos para reduzir o desperdício de matéria-prima.</li>
              <li>Busque parcerias para logística reversa de embalagens e insumos.</li>
            </ul>
          </div>

        </div>
      </section>


    </div>
  );
}

export default Diagnosis;