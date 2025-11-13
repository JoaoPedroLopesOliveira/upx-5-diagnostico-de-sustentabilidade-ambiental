import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import styles from '../css/Register.module.css';

function Register() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [sector, setSector] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!name || !location || !sector) {
      setError('Por favor, preencha todos os campos.');
      setIsLoading(false);
      return;
    }

    try {
      await api.post('/companies/', {
        name: name,
        location: location,
        sector: sector,
      });

      navigate('/');

    } catch (err) {
      if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError('Ocorreu um erro ao cadastrar a empresa.');
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <form className={styles.registerForm} onSubmit={handleSubmit}>
        <h2>Cadastre sua Empresa</h2>
        <p>Preencha os dados abaixo para iniciar seu diagnóstico de 30 dias.</p>
        
        <div className={styles.formGroup}>
          <label htmlFor="name">Nome da Empresa</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Indústria Têxtil S.A."
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="location">Localização</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Ex: São Paulo, SP"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="sector">Setor</label>
          <input
            type="text"
            id="sector"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            placeholder="Ex: Têxtil"
          />
        </div>

        {error && <p className={styles.errorMessage}>{error}</p>}
        
        <button type="submit" className={styles.submitButton} disabled={isLoading}>
          {isLoading ? 'Cadastrando...' : 'Cadastrar e Gerar Diagnóstico'}
        </button>
      </form>
    </div>
  );
}

export default Register;