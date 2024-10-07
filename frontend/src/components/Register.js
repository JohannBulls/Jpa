import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
  
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 8 || password.length > 20) {
      setError('La contraseña debe tener entre 8 y 20 caracteres');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8080/auth/register', {
        username,
        password,
      });
  
      if (response.data === "Usuario registrado correctamente") {
        navigate('/login');
      } else {
        setError('Error al registrar el usuario');
      }
    } catch (error) {
      setError('Error en el registro');
      console.error('Error registrando usuario:', error);
    }
  }; 

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '400px' }}>
        <h2 className="text-center">Registrarse</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Nombre de Usuario</label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-3 position-relative">
            <label htmlFor="password" className="form-label">
              Contraseña (Debe tener entre 8 y 20 caracteres)
            </label>
            <div className="input-group">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="8"
                maxLength="20"
              />
              <span className="input-group-text" onClick={togglePasswordVisibility}>
                <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
              </span>
            </div>
          </div>
          
          <div className="mb-3 position-relative">
            <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
            <div className="input-group">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                id="confirmPassword"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span className="input-group-text" onClick={toggleConfirmPasswordVisibility}>
                <FontAwesomeIcon icon={confirmPasswordVisible ? faEyeSlash : faEye} />
              </span>
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary w-100">Registrar</button>
        </form>

        <p className="text-center mt-3">
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;