import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();


        localStorage.setItem('email', email);
        localStorage.setItem('password', password);

        alert('Cadastro realizado com sucesso!');
        navigate('/login');
    };

    return (
        <div className="register-container">
            <h2>Registre-se</h2>
            <form onSubmit={handleRegister}>
                <div className="input-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Senha</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Cadastrar</button>
            </form>
            <p>
                Já tem uma conta?{' '}
                <span onClick={() => navigate('/')}>Faça login</span>
            </p>
        </div>
    );
};

export default Register;
