import React, { useEffect, useState } from 'react';

const ProfileDetail = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Simulate fetching user profile
    setTimeout(() => {
      setProfile({
        name: 'Rishabh SawantDesai',
        email: 'rishabh.desai@gmail.com',
        phone: '1234567890',
      });
    }, 300);
  }, []);

  if (!profile) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-5">
      <h2 className="mb-3">Profile Details</h2>
      <div className="card p-4 shadow-sm">
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Phone:</strong> {profile.phone}</p>
      </div>
    </div>
  );
};

export default ProfileDetail;
