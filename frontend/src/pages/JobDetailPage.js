import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../utils/axios';

function JobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      const response = await axios.get(`/jobs/${id}/`);
      setJob(response.data);
    };
    fetchJob();
  }, [id]);

  if (!job) return <p>Loading job details...</p>;

  return (
    <div>
      <h2>{job.title}</h2>
      <p>{job.company}</p>
      <p>{job.location}</p>
      <p>{job.job_type}</p>
      <p>${job.salary}</p>
      <p>{job.description}</p>
      <Link to={`/jobs/${id}/apply`} className="btn btn-primary">Apply Now</Link>
    </div>
  );
}

export default JobDetailPage;
