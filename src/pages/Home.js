import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <h1>Bem vindo ao sistema de reservas de festas</h1>
            <div className="button-group">
                <button onClick={() => navigate("/formulario-cliente")}>
                    Formulário Cliente
                </button>
                <button onClick={() => navigate("/dashboard-reservas")}>
                    Dashboard Reserva
                </button>
            </div>
            <button className="logout-button" onClick={() => navigate("/")}>
                Sair
            </button>
        </div>
    );
}

export default Home;
