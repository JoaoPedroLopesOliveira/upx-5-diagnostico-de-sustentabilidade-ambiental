import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Diagnosis from "./pages/Diagnosis";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import styles from "./css/App.module.css";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <div className={styles.appContainer}>
        
        <nav className={styles.navbar}>
          <Link to="/" className={styles.navLink}>
            Home
          </Link>
          <Link to="/about" className={styles.navLink}>
            Sobre
          </Link>
          <Link to="/register" className={styles.navLink}>
            Cadastrar Empresa
          </Link>
        </nav>

        <main className={styles.mainContent}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/diagnosis/:id" element={<Diagnosis />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;