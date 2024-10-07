import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    
    console.log("Enviando usuario:", username);
    console.log("Enviando contraseña:", password);
    
    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        username,
        password,
      });
  
      if (response.status === 200) {
        sessionStorage.setItem('authenticated', true);
        setError('');
        navigate('/properties');
      } else {
        setError('Credenciales inválidas');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Credenciales inválidas');
      } else {
        setError('Error al iniciar sesión');
      }
    }
  };
  

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Nombre de Usuario:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      <p>No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p>
    </div>
  );
}

export default Login;
