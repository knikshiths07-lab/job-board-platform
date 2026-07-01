import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

function ApplyJobPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      const response = await axios.get(`/jobs/${id}/`);
      setJob(response.data);
    };
    fetchJob();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume) {
      setError('Please upload your resume.');
      return;
    }
    const formData = new FormData();
    formData.append('job_id', id);
    formData.append('resume', resume);
    formData.append('cover_letter', coverLetter);
    try {
      await axios.post('/applications/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/profile');
    } catch (err) {
      setError('Failed to submit application.');
    }
  };

  if (!job) return <p>Loading...</p>;

  return (
    <div>
      <h2>Apply for {job.title}</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Resume</label>
          <input type="file" className="form-control" onChange={(e) => setResume(e.target.files[0])} />
        </div>
        <div className="mb-3">
          <label className="form-label">Cover Letter</label>
          <textarea className="form-control" rows="5" value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} />
        </div>
        <button className="btn btn-primary">Submit Application</button>
      </form>
    </div>
  );
}

export default ApplyJobPage;
