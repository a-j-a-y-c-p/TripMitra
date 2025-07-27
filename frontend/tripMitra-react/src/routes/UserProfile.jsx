// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../CSS/UserProfile.css';

// const UserProfile = ({ userId }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     axios.get(`/api/userdetails/${userId}`)
//       .then(res => setUser(res.data))
//       .catch(err => console.error('Failed to fetch user:', err));
//   }, [userId]);

//   if (!user) return <div>Loading...</div>;

//   return (

//     <div className="profile-container glass">
//       <div className="profile-image">
//         <img src={user.imageUrl || '/default-profile.png'} alt="User" />
//       </div>
//       <div className="profile-info">
//         <h2>User Profile</h2>
//         <p><strong>User ID::</strong> {user.userDetailsId}</p>
//         <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
//         <p><strong>Alternate Phone Number:</strong> {user.alterPhone}</p>
//         <p><strong>Gender::</strong> {user.gender}</p>
//         <p><strong>Date of Birth:</strong> {user.dateOfBirth}</p>

//         <p><strong>Trip Host:</strong> {user.isTripHost ? 'Yes' : 'No'}</p>
//         <p><strong>Address ID:</strong> {user.addressId}</p>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;

import React, { useEffect, useState } from 'react';
import '../CSS/UserProfile.css';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate API delay with dummy data
    const dummyUser = {
      userDetailsId: 'USR123456',
      phoneNumber: '+91-9876543210',
      alterPhone: '+91-9123456780',
      gender: 'Male',
      dateOfBirth: '1998-04-25',
      isTripHost: true,
      addressId: 'ADDR7890',
      imageUrl: 'https://randomuser.me/api/portraits/men/75.jpg',
    };

    setTimeout(() => {
      setUser(dummyUser);
    }, 1000);
  }, [userId]);

  if (!user) return <div className="loading">Loading...</div>;

  return (
    <div className="profile-wrapper">
      <div className="profile-container glass">
        <div className="profile-image">
          <img src={user.imageUrl || '/default-profile.png'} alt="User" />
        </div>
        <div className="profile-info">
          <h2>User Profile</h2>
          <p><strong>User ID:</strong> {user.userDetailsId}</p>
          <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
          <p><strong>Alternate Phone Number:</strong> {user.alterPhone}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Date of Birth:</strong> {user.dateOfBirth}</p>
          <p><strong>Trip Host:</strong> {user.isTripHost ? 'Yes' : 'No'}</p>
          <p><strong>Address ID:</strong> {user.addressId}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

