import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

function EditJobPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [jobType, setJobType] = useState('Full Time');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      const response = await axios.get(`/jobs/${id}/`);
      setJob(response.data);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setLocation(response.data.location);
      setSalary(response.data.salary);
      setJobType(response.data.job_type);
    };
    fetchJob();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/jobs/${id}/`, { title, description, location, salary, job_type: jobType });
      navigate('/employer');
    } catch (err) {
      setError('Failed to update the job.');
    }
  };

  if (!job) return <p>Loading job...</p>;

  return (
    <div>
      <h2>Edit Job</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
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
        <button className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
}

export default EditJobPage;
