import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";
import jsPDF from "jspdf";
import "./FormularioCliente.css";

function FormularioCliente() {
    const location = useLocation();
    const navigate = useNavigate();
    const signatureRef = useRef();
    const [formData, setFormData] = useState({
        nome: "",
        cpf: "",
        endereco: "",
        telefone: "",
        dataRetirada: "",
        dataDevolucao: "",
        descricaoMateriais: "",
        totalAluguel: "",
    });

    useEffect(() => {
        if (location.state && location.state.reserva) {
            setFormData(location.state.reserva);
        }
    }, [location.state]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const storedData = JSON.parse(localStorage.getItem("reservas")) || [];
        if (location.state && location.state.reserva) {
            const updatedData = storedData.map((item) =>
                item.cpf === formData.cpf ? formData : item
            );
            localStorage.setItem("reservas", JSON.stringify(updatedData));
        } else {
            storedData.push(formData);
            localStorage.setItem("reservas", JSON.stringify(storedData));
        }
        navigate("/dashboard-reservas");
    };

    const generatePDF = () => {
        const pdf = new jsPDF();
        pdf.setFontSize(18);
        pdf.text("Contrato de Aluguel de Decoração", 10, 20);
        pdf.setFontSize(12);
        pdf.text(`Nome: ${formData.nome}`, 10, 40);
        pdf.text(`CPF: ${formData.cpf}`, 10, 50);
        pdf.text(`Endereço: ${formData.endereco}`, 10, 60);
        pdf.text(`Telefone: ${formData.telefone}`, 10, 70);
        pdf.text(`Data Retirada: ${formData.dataRetirada}`, 10, 80);
        pdf.text(`Data Devolução: ${formData.dataDevolucao}`, 10, 90);
        pdf.text(`Descrição dos Materiais: ${formData.descricaoMateriais}`, 10, 100);
        pdf.text(`Total do Aluguel: R$${formData.totalAluguel}`, 10, 110);


        const contractMessage = "Locação é no prazo determinado, cuja entrega dos materiais locados deverão ser entregues no dia combinado. Locações retiradas no final de semana deverão ser devolvidas até a terça feira sob pena de multa de 10.00 R$ por dia de atraso. Não Colocar cola quente em tecidos e Cortinas. O pagamento deverá ser realizado na retirada do Kit.";
        pdf.text(contractMessage, 10, 120, { maxWidth: 180 });

        const signatureImage = signatureRef.current.getTrimmedCanvas().toDataURL("image/png");
        pdf.text("Assinatura:", 10, 160);
        pdf.addImage(signatureImage, "PNG", 10, 170, 60, 30);

        pdf.save(`${formData.nome}_contrato.pdf`);
    };

    const clearSignature = () => {
        signatureRef.current.clear();
    };

    return (
        <div className="formulario-container">
            <h2 className="message-title">
                Locação é no prazo determinado, cuja entrega dos materiais locados deverão ser entregues no dia combinado.
                Locações retiradas no final de semana deverão ser devolvidas até a terça-feira sob pena de multa de 10.00 R$ por dia de atraso.
                Não Colocar cola quente em tecidos e Cortinas. O pagamento deverá ser realizado na retirada do Kit.
            </h2>
            <h2>{location.state ? "Editar Reserva" : "Nova Reserva"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nome Completo</label>
                    <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>CPF</label>
                    <input
                        type="text"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Endereço</label>
                    <input
                        type="text"
                        name="endereco"
                        value={formData.endereco}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Telefone</label>
                    <input
                        type="text"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Data de Retirada</label>
                    <input
                        type="date"
                        name="dataRetirada"
                        value={formData.dataRetirada}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Data de Devolução</label>
                    <input
                        type="date"
                        name="dataDevolucao"
                        value={formData.dataDevolucao}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Descrição dos Materiais</label>
                    <textarea
                        name="descricaoMateriais"
                        value={formData.descricaoMateriais}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Total do Aluguel</label>
                    <input
                        type="number"
                        name="totalAluguel"
                        value={formData.totalAluguel}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Salvar</button>
            </form>

            <div className="signature-section">
                <h3>Assinatura</h3>
                <SignatureCanvas
                    ref={signatureRef}
                    canvasProps={{
                        width: 500,
                        height: 150,
                        className: "signature-canvas",
                    }}
                />
                <button onClick={clearSignature}>Limpar Assinatura</button>
            </div>

            <div className="pdf-section">
                <button onClick={generatePDF}>Gerar PDF</button>
            </div>
        </div>
    );
}

export default FormularioCliente;
