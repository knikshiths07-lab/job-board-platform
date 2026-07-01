import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

function CreateJobPage() {
  const [companies, setCompanies] = useState([]);
  const [companyId, setCompanyId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [jobType, setJobType] = useState('Full Time');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await axios.get('/companies/');
      setCompanies(response.data);
      if (response.data.length > 0) setCompanyId(response.data[0].id);
    };
    fetchCompanies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/jobs/', { company_id: companyId, title, description, location, salary, job_type: jobType });
      navigate('/employer');
    } catch (err) {
      setError('Error creating job. Ensure your company belongs to your account.');
    }
  };

  return (
    <div>
      <h2>Create Job</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Company</label>
          <select className="form-select" value={companyId} onChange={(e) => setCompanyId(e.target.value)}>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>{company.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" rows="5" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Location</label>
          <input className="form-control" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Salary</label>
          <input type="number" step="0.01" className="form-control" value={salary} onChange={(e) => setSalary(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Job Type</label>
          <select className="form-select" value={jobType} onChange={(e) => setJobType(e.target.value)}>
            <option>Full Time</option>
            <option>Part Time</option>
            <option>Internship</option>
            <option>Remote</option>
          </select>
        </div>
        <button className="btn btn-primary">Create Job</button>
      </form>
    </div>
  );
}

export default CreateJobPage;
