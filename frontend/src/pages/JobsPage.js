import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { Link } from 'react-router-dom';

function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await axios.get('/jobs/', {
        params: { search, location, job_type: jobType },
      });
      setJobs(response.data);
    };
    fetchJobs();
  }, [search, location, jobType]);

  return (
    <div>
      <h2>Job Listings</h2>
      <div className="row mb-4">
        <div className="col-md-4 mb-2">
          <input className="form-control" placeholder="Search jobs" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="col-md-4 mb-2">
          <input className="form-control" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div className="col-md-4 mb-2">
          <select className="form-select" value={jobType} onChange={(e) => setJobType(e.target.value)}>
            <option value="">All Job Types</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
          </select>
        </div>
      </div>
      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <div className="list-group">
          {jobs.map((job) => (
            <Link key={job.id} to={`/jobs/${job.id}`} className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{job.title}</h5>
                <small>{job.job_type}</small>
              </div>
              <p className="mb-1">{job.company} • {job.location}</p>
              <small>${job.salary}</small>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default JobsPage;
