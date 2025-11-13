import React from 'react';
import styles from '../css/About.module.css';

import { FaUsers, FaBullseye, FaProjectDiagram, FaUniversity } from 'react-icons/fa';

const Sobre = () => {
  return (
    <div className={styles.sobreContainer}>
      <header className={styles.header}>
        <h1>Sobre Nosso Projeto</h1>
        <p>Entenda a motivação e os objetivos da nossa plataforma.</p>
      </header>

      <section className={styles.cardGrid}>
        <div className={styles.card}>
          <FaUsers size={40} className={styles.icon} />
          <h2>Quem Somos</h2>
          <p>
            Somos um grupo de estudantes de tecnologia do Centro Universitário Newton Paiva.
            Este projeto é o resultado de nosso esforço colaborativo na disciplina 
            Usina de Projetos Experimentais (UPX).
          </p>
        </div>

        
        <div className={styles.card}>
          <FaBullseye size={40} className={styles.icon} />
          <h2>Nossa Missão</h2>
          <p>
            Nossa missão é propor uma solução para a carência de ferramentas acessíveis
            voltadas para pequenas e médias indústrias (PMEs). 
            Muitas delas não conseguem monitorar seu consumo de energia, água e insumos, 
            gerando desperdícios e custos elevados.
          </p>
        </div>

        
        <div className={styles.card}>
          <FaProjectDiagram size={40} className={styles.icon} />
          <h2>A Plataforma</h2>
          <p>
            Desenvolvemos uma plataforma digital de diagnóstico sustentável. 
            Com dashboards, alertas, relatórios e simuladores de impacto, 
            nosso sistema ajuda gestores a tomar decisões mais eficientes, 
            reduzindo custos e o impacto ambiental.
          </p>
        </div>

        
        <div className={styles.card}>
          <FaUniversity size={40} className={styles.icon} />
          <h2>Contexto Acadêmico</h2>
          <p>
            Este MVP (Produto Mínimo Viável) demonstra como a tecnologia pode 
            modernizar a gestão industrial. O projeto está alinhado à 
            ODS 9 (Indústria, Inovação e Infraestrutura), provando o potencial 
            da inovação acadêmica para resolver problemas reais.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Sobre;