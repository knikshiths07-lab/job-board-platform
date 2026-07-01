import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { login } from '../utils/auth';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/login/', { username, password });
      login(response.data.access, response.data.refresh);
      navigate('/');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2>Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
