# Diagnóstico de Sustentabilidade 🌱

Uma aplicação web completa para diagnóstico e avaliação da sustentabilidade de empresas. O sistema coleta métricas ambientais como consumo de energia, água e geração de resíduos, gerando relatórios e diagnósticos personalizados sobre o desempenho sustentável de cada organização.

## 🌐 Acesso Online

**A aplicação está disponível online em:** https://diagnostico-sustentabilidade.vercel.app/

Acesse o link acima para testar a plataforma sem necessidade de instalação local!

## 📋 Visão Geral do Projeto

O **Diagnóstico de Sustentabilidade** é uma plataforma que permite:

- **Cadastro de Empresas**: Registrar informações básicas sobre empresas (nome, setor, localização)
- **Coleta de Métricas**: Acompanhar métricas ambientais como:
  - Consumo de energia (kWh)
  - Consumo de água (m³)
  - Geração de resíduos (kg)
- **Análise de Sustentabilidade**: Gerar diagnósticos automatizados baseados em algoritmos de avaliação
- **Classificação**: Classificar o desempenho da empresa em categorias de sustentabilidade
- **Relatórios**: Exportar diagnósticos em formato PDF

## 🏗️ Arquitetura

O projeto segue uma arquitetura de três camadas:

```
┌─────────────────────────────────────────────┐
│   Frontend (React.js)                       │
│   - Interface de usuário                    │
│   - Gerenciamento de rotas                  │
│   - Integração com API                      │
└─────────────────────────────────────────────┘
                    ↓ HTTP/REST
┌─────────────────────────────────────────────┐
│   Backend (FastAPI + SQLAlchemy)            │
│   - API RESTful                             │
│   - Lógica de negócio                       │
│   - Autenticação CORS                       │
└─────────────────────────────────────────────┘
                    ↓ SQL
┌─────────────────────────────────────────────┐
│   Banco de Dados (SQLAlchemy ORM)           │
│   - Armazenamento de empresas               │
│   - Armazenamento de métricas               │
└─────────────────────────────────────────────┘
```

## 📁 Estrutura de Pastas

```
sustaina-diagnosis/
├── sustaina-diagnosis-backend/       # API Backend (Python + FastAPI)
│   ├── app/
│   │   ├── main.py                  # Aplicação principal e rotas
│   │   ├── models.py                # Modelos de banco de dados
│   │   ├── schemas.py               # Schemas Pydantic
│   │   ├── database.py              # Configuração do banco
│   │   ├── seed.py                  # Scripts de seed
│   │   └── __pycache__/
│   └── requirements.txt             # Dependências Python
│
└── sustaina-diagnosis-frontend/      # Interface (React.js)
    ├── public/                       # Arquivos estáticos
    │   ├── index.html
    │   ├── manifest.json
    │   └── robots.txt
    ├── src/
    │   ├── pages/                    # Páginas da aplicação
    │   │   ├── Home.js
    │   │   ├── About.js
    │   │   ├── Diagnosis.js
    │   │   └── Register.js
    │   ├── services/
    │   │   └── api.js                # Cliente HTTP (Axios)
    │   ├── css/                      # Estilos CSS modularizados
    │   ├── App.js                    # Componente principal
    │   └── index.js                  # Ponto de entrada
    └── package.json                  # Dependências Node.js
```

## 🚀 Stack Tecnológico

### Backend
- **FastAPI**: Framework web moderno e de alto desempenho
- **SQLAlchemy**: ORM para manipulação de banco de dados
- **Uvicorn**: Servidor ASGI
- **Pydantic**: Validação de dados
- **ReportLab**: Geração de relatórios em PDF
- **Python-dotenv**: Gerenciamento de variáveis de ambiente

### Frontend
- **React 19**: Biblioteca para construção de interfaces
- **React Router DOM**: Roteamento de páginas
- **Axios**: Cliente HTTP
- **React Icons**: Ícones SVG
- **CSS Modules**: Estilos encapsulados por componente

## 📦 Requisitos do Sistema

### Backend
- Python 3.8+
- pip (gerenciador de pacotes Python)

### Frontend
- Node.js 14+
- npm ou yarn

## ⚙️ Instalação e Configuração

### 1. Backend (FastAPI)

```bash
# Navegar para o diretório backend
cd sustaina-diagnosis-backend

# Criar um ambiente virtual (recomendado)
python -m venv venv

# Ativar o ambiente virtual
# No Windows:
venv\Scripts\activate
# No Linux/Mac:
source venv/bin/activate

# Instalar dependências
pip install -r requirements.txt

# Executar o servidor
uvicorn app.main:app --reload
```

O backend estará disponível em: `http://localhost:8000`

**Documentação interativa da API**: `http://localhost:8000/docs`

### 2. Frontend (React)

```bash
# Navegar para o diretório frontend
cd sustaina-diagnosis-frontend

# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm start
```

O frontend estará disponível em: `http://localhost:3000`

## 🔗 Endpoints da API

### Empresas
- **GET** `/companies/` - Lista todas as empresas cadastradas
- **POST** `/companies/` - Cadastra uma nova empresa

### Métricas
- **GET** `/companies/{company_id}/metrics/` - Retorna métricas de uma empresa
- **POST** `/companies/{company_id}/metrics/` - Adiciona nova métrica

### Diagnóstico
- **GET** `/companies/{company_id}/diagnosis/` - Gera diagnóstico de sustentabilidade
- **GET** `/companies/{company_id}/diagnosis/pdf` - Exporta diagnóstico em PDF

## 📊 Algoritmo de Avaliação

O sistema utiliza um algoritmo para calcular o índice de sustentabilidade:

1. **Coleta de Métricas**: Energia (kWh), Água (m³) e Resíduos (kg)
2. **Cálculo de Médias**: Média aritmética das métricas coletadas
3. **Pontuação**: Cada métrica recebe uma pontuação (0-100)
   - Energia: `100 - (consumo / 10)`
   - Água: `100 - (consumo / 5)`
   - Resíduos: `100 - (geração / 2)`
4. **Índice Final**: Média das três pontuações
5. **Classificação**:
   - ✅ **≥ 85**: Excelente desempenho
   - ✅ **70-84**: Bom desempenho, espaço para melhorias
   - ⚠️ **50-69**: Desempenho médio, ações recomendadas
   - ❌ **< 50**: Desempenho insatisfatório, ações imediatas necessárias

## 🔐 Segurança (CORS)

O backend está configurado para aceitar requisições de:
- `http://localhost:3000` (desenvolvimento local)
- `https://diagnostico-sustentabilidade.vercel.app` (produção)

## 📱 Funcionalidades

### Home
- Listagem de todas as empresas cadastradas
- Acesso rápido aos diagnósticos

### Cadastro de Empresa
- Formulário para registrar nova empresa
- Campos: Nome, Setor, Localização
- Validação de dados

### Diagnóstico
- Visualização detalhada do desempenho de sustentabilidade
- Análise de métricas individuais
- Relatórios em tempo real
- Exportação de diagnósticos em PDF

### Sobre
- Informações sobre a plataforma
- Objetivos do projeto
- Impacto ambiental

## 🛠️ Desenvolvimento

### Adicionar Nova Métrica
1. Atualizar `models.py` com novo campo
2. Criar migration (se aplicável)
3. Atualizar `schemas.py`
4. Adicionar rota em `main.py`
5. Atualizar frontend para coletar novo dado

### Customizar Algoritmo
Edite a função `get_company_diagnosis()` em `sustaina-diagnosis-backend/app/main.py` para alterar os pesos e fórmulas de cálculo.

## 📝 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto backend:

```env
DATABASE_URL=sqlite:///./sustainability.db
SECRET_KEY=sua_chave_secreta
DEBUG=True
```

## 🧪 Testes

### Frontend
```bash
cd sustaina-diagnosis-frontend
npm test
```

### Backend
```bash
cd sustaina-diagnosis-backend
pytest
```

## 📜 Licença

Este projeto é fornecido como está. Verifique as licenças das dependências utilizadas.

## 👥 Contribuição

Para contribuir com o projeto:
1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Add NovaFeature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

## 📞 Contato e Suporte

Para dúvidas, sugestões ou reportar problemas, abra uma issue no repositório.

---

**Desenvolvido com ❤️ para um futuro mais sustentável 🌍**
