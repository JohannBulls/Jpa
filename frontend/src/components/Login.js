import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

/**
 * Login component for user authentication.
 * 
 * This component handles the user login process by sending the username and password to the backend API.
 * It also includes password visibility toggling functionality and error handling.
 */
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  /**
   * Handles the login process when the form is submitted.
   * Sends the username and password to the backend and checks the response.
   * 
   * @param {object} event - The form submission event.
   */
  const handleLogin = async (event) => {
    event.preventDefault();
    
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
        setError('Invalid credentials');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid credentials');
      } else {
        setError('Error logging in');
      }
    }
  };

  /**
   * Toggles the visibility of the password field.
   */
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '400px' }}>
        <h2 className="text-center">Login</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-3 position-relative">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-group">
              <input
                type={passwordVisible ? "text" : "password"}
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="input-group-text" onClick={togglePasswordVisibility}>
                <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
              </span>
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>

        <p className="text-center mt-3">
          Don't have an account? <Link to="/register">Sign up here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
