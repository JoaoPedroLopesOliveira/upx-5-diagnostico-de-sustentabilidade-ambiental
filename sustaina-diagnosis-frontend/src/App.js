import React  from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Diagnosis from "./pages/Diagnosis";
import { Link } from "react-router-dom";

function App() {
  return (
    <Router>
        <nav style={{ background: "#0f5132", padding: "10px" }}>
          <Link to="/" style={{ color: "white", marginRight: "15px" }}>
            Home
          </Link>
          <Link to="/diagnosis" style={{ color: "white" }}>
            Diagnóstico
          </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diagnosis/:id" element={<Diagnosis />} />
      </Routes>
    </Router>
  );
}

export default App;