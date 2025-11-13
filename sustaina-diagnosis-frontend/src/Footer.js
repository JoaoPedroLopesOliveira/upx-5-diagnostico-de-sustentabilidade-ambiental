import React from 'react';
import styles from './css/Footer.module.css';
import { FaEnvelope } from 'react-icons/fa';

 
const participants = [
  { nome: 'Álvaro Daniel Teixeira de Almeida', email: 'alvarood023@gmail.com' },
  { nome: 'Luan Pablo Magalhães Lima', email: 'Luanpazito@gmail.com' },
  { nome: 'Eduardo Bernardes Silva', email: 'eduardobsilva13@gmail.com' },
  { nome: 'Carlos Aguiar Pettersen Sobrinho', email: 'carlinhosobrinho18@gmail.com' },
  { nome: 'Jean Lucas Barbosa Vargas', email: 'jeanlucas059@gmail.com' },
  { nome: 'João Pedro Lopes de Oliveira', email: 'joao.aprendiz4@gmail.com' },
  { nome: 'Gustavo Penido Carvalho', email: 'gustavopenido04@gmail.com' },
];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.contactSection}>
          <h3>Equipe responsavel pelo desenvolvimento</h3>
          <ul className={styles.participantList}>
            {participants.map((person) => (
              <li key={person.email} className={styles.participant}>
                <strong>{person.nome}</strong>
                <a href={`mailto:${person.email}`} className={styles.emailLink}>
                  <FaEnvelope size={14} /> {person.email}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>
          &copy; {new Date().getFullYear()} - Plataforma de Diagnóstico de Sustentabilidade
          <br />
          Projeto acadêmico desenvolvido no Centro Universitário Newton Paiva 
        </p>
      </div>
    </footer>
  );
};

export default Footer;