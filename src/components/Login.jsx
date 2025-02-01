import axios from 'axios';
import React, { useState } from 'react';
import API_BASE_URL from '../config.js';
import './Login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Logs each time an input changes
  const handleChange = (e) => {
    console.log(`[Login] handleChange - Field: ${e.target.name}, Value: ${e.target.value}`);
    
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Clear error when user types
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('[Login] handleSubmit - FormData:', formData);

    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? '/login' : '/register';
      console.log(`[Login] handleSubmit - Calling endpoint: ${API_BASE_URL}${endpoint}`);

      // Send request to the server
      const response = await axios.post(`${API_BASE_URL}${endpoint}`, formData);

      console.log('[Login] handleSubmit - Response data:', response.data);

      // Store token and user data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Redirect to dashboard
      console.log('[Login] handleSubmit - Redirecting to /dashboard');
      window.location.href = '/dashboard';
    } catch (err) {
      console.error('[Login] handleSubmit - Error:', err);
      setError(
        err.response?.data?.error ||
        'An error occurred. Please try again.'
      );
    } finally {
      setLoading(false);
      console.log('[Login] handleSubmit - Finished request');
    }
  };

  // Helper to validate the form
  const validateForm = () => {
    if (!formData.username || !formData.password || (!isLogin && !formData.email)) {
      return false;
    }
    return true;
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              minLength={3}
              maxLength={50}
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading || !validateForm()}
          >
            {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Register')}
          </button>
        </form>

        <p className="toggle-form">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span
            onClick={() => {
              console.log('[Login] Toggling form - from', isLogin ? 'Login' : 'Register', 'to', !isLogin ? 'Login' : 'Register');
              setIsLogin(!isLogin);
              setError('');
              setFormData({ username: '', password: '', email: '' });
            }}
          >
            {isLogin ? 'Register here' : 'Login here'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
