import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import FormularioCliente from "./pages/FormularioCliente";
import DashboardReservas from "./pages/DashboardReservas";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/formulario-cliente" element={<FormularioCliente />} />
        <Route path="/dashboard-reservas" element={<DashboardReservas />} />
      </Routes>
    </Router>
  );
}

export default App;
