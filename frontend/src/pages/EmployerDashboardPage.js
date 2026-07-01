import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../utils/axios';

function EmployerDashboardPage() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const jobResponse = await axios.get('/jobs/');
      setJobs(jobResponse.data);
      const appResponse = await axios.get('/applications/', { params: { employer: true } });
      setApplications(appResponse.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Employer Dashboard</h2>
        <Link to="/employer/jobs/create" className="btn btn-primary">Create Job</Link>
      </div>
      <div className="mb-4">
        <h4>Your Jobs</h4>
        {jobs.length === 0 ? <p>No jobs yet.</p> : (
          <div className="list-group">
            {jobs.map((job) => (
              <Link key={job.id} to={`/jobs/${job.id}`} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                <span>{job.title}</span>
                <Link to={`/employer/jobs/${job.id}/edit`} className="btn btn-sm btn-outline-secondary">Edit</Link>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div>
        <h4>Applications</h4>
        {applications.length === 0 ? <p>No applications yet.</p> : (
          <div className="list-group">
            {applications.map((application) => (
              <div key={application.id} className="list-group-item">
                <strong>{application.job_title}</strong>
                <p>{application.user}</p>
                <p>Status: {application.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployerDashboardPage;
