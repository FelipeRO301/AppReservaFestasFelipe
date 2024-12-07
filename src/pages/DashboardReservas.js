import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardReservas.css";

function DashboardReservas() {
    const [reservas, setReservas] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {

            const storedData = JSON.parse(localStorage.getItem("reservas")) || [];
            setReservas(storedData);
        };
        fetchData();
    }, []);


    const handleViewOrEdit = (reserva) => {
        navigate(`/formulario-cliente`, { state: { reserva } });
    };

    return (
        <div className="dashboard-container">
            <h2>Dashboard de Reservas</h2>
            <div className="reservas-list">
                {reservas.length > 0 ? (
                    reservas.map((reserva, index) => (
                        <div key={index} className="reserva-frame">
                            <p><strong>Cliente:</strong> {reserva.nome}</p>
                            <p><strong>CPF:</strong> {reserva.cpf}</p>
                            <button onClick={() => handleViewOrEdit(reserva)}>Visualizar/Editar</button>
                        </div>
                    ))
                ) : (
                    <p>Não há reservas cadastradas.</p>
                )}
            </div>
        </div>
    );
}

export default DashboardReservas;
