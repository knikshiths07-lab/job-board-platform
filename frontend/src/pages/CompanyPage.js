import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../utils/axios';

function CompanyPage() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      const response = await axios.get(`/companies/${id}/`);
      setCompany(response.data);
    };
    fetchCompany();
  }, [id]);

  if (!company) return <p>Loading company...</p>;

  return (
    <div>
      <h2>{company.name}</h2>
      <p>{company.description}</p>
      <p>{company.location}</p>
      <a href={company.website} target="_blank" rel="noreferrer">Visit Website</a>
    </div>
  );
}

export default CompanyPage;
