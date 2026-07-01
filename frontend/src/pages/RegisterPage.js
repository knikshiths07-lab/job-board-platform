import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/register/', { username, email, password, first_name: firstName, last_name: lastName });
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Please check your details.');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2>Register</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
