import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';

function ProfilePage() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await axios.get('/auth/profile/');
      setProfile(response.data);
    };
    fetchProfile();
  }, []);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>Profile</h2>
      <div className="card p-4">
        <p><strong>Username:</strong> {profile.username}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Name:</strong> {profile.first_name} {profile.last_name}</p>
        <p><strong>Employer:</strong> {profile.is_employer ? 'Yes' : 'No'}</p>
        <p><strong>Applications:</strong> {profile.application_count}</p>
      </div>
    </div>
  );
}

export default ProfilePage;
