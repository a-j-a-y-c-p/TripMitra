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
{/* <button type="submit">Update Profile</button> */}
//     </div>
//   );
// };

// export default UserProfile;

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // ✅ Needed for navigation
// import '../CSS/UserProfile.css';

// const UserProfile = ({ userId }) => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Simulate API delay with dummy data
//     const dummyUser = {
//       userDetailsId: 'USR123456',
//       phoneNumber: '+91-9876543210',
//       alterPhone: '+91-9123456780',
//       gender: 'Male',
//       dateOfBirth: '1998-04-25',
//       isTripHost: true,
//       addressId: 'ADDR7890',
//       imageUrl: 'https://randomuser.me/api/portraits/men/75.jpg',
//     };

//     setTimeout(() => {
//       setUser(dummyUser);
//     }, 1000);
//   }, [userId]);

//   if (!user) return <div className="loading">Loading...</div>;

//   const handleUpdateProfile = () => {
//     navigate('/UpdateProfile'); // ✅ Navigates to update page
//   };

//   return (
//     <div className="profile-wrapper">
//       <div className="profile-container glass">
//         <div className="profile-image">
//           <img src={user.imageUrl || '/default-profile.png'} alt="User" />
//         </div>
//         <div className="profile-info">
//           <h2>User Profile</h2>
//           <p><strong>User ID:</strong> {user.userDetailsId}</p>
//           <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
//           <p><strong>Alternate Phone Number:</strong> {user.alterPhone}</p>
//           <p><strong>Gender:</strong> {user.gender}</p>
//           <p><strong>Date of Birth:</strong> {user.dateOfBirth}</p>
//           <p><strong>Trip Host:</strong> {user.isTripHost ? 'Yes' : 'No'}</p>
//           <p><strong>Address ID:</strong> {user.addressId}</p>
//         </div>
//         <button type="button" onClick={handleUpdateProfile}>Update Profile</button>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;


// import React, { useEffect, useState } from 'react';
// import '../CSS/UserProfile.css'; // Keep styles

// const UserProfile = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const dummyUser = {
//       firstName: 'Jane',
//       lastName: 'Doe',
//       middleName: 'Baker',
//       gender: 'Female',
//       phoneNumber: '+91-9876543210',
//       email: 'janedoe@gmail.com',
//       password: 'password123',
//       imageUrl: 'https://randomuser.me/api/portraits/women/75.jpg',
//     };

//     setTimeout(() => {
//       setUser(dummyUser);
//     }, 1000);
//   }, []);

//   if (!user) return <div>Loading...</div>;

//   return (
//     <div className="user-profile-wrapper">
//       <div className="profile-left">
//         <img src={user.imageUrl} alt="Profile" className="profile-pic" />
//         <h3>{user.firstName} {user.lastName}</h3>
//         <p>CEO of Apple</p>

//       </div>

//       <div className="profile-right">
//         <div className="tabs">
//           <span className="active-tab">User Profile</span>
          
//         </div>

//         <div className="form-section">
//           <div className="form-group">
//             <label>First Name</label>
//             <input value={user.firstName} readOnly />
//           </div>
//           <div className="form-group">
//             <label>Last Name</label>
//             <input value={user.lastName} readOnly />
//           </div>
//           <div className="form-group">
//             <label>Middle Name</label>
//             <input value={user.middleName} readOnly />
//           </div>
//           <div className="form-group">
//             <label>Gender</label>
//             <input value={user.gender} readOnly />
//           </div>
//           <div className="form-group">
//             <label>Phone Number</label>
//             <input value={user.phoneNumber} readOnly />
//           </div>
//           <div className="form-group">
//             <label>Email Address</label>
//             <input value={user.email} readOnly />
//           </div>
//           <div className="form-group">
//             <label>Password</label>
//             <input type="password" value={user.password} readOnly />
//           </div>

//           <button className="edit-btn">Edit</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;


// import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../CSS/UserProfile.css';

// const UserProfile = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const dummyUser = {
//       userName: 'Aman Gupta',
//       addressLine1: 'Flat No. 203, Palm Residency',
//       addressLine2: 'Near Infinity Mall, Andheri West',
//       district: 'Mumbai Suburban',
//       state: 'Maharashtra',
//       pincode: '400053',
//       dateOfBirth: '21-09-1992',
//       gender: 'Male',
//       phoneNumber: '+91-9876543210',
//       alterPhone: '+91-9123456780',
//       userEmail: 'ag@gmail.com',
//       userPassword: 'password123',
//       imageUrl: 'https://randomuser.me/api/portraits/men/73.jpg',
//       userRole: 'User',
//     };

//     setTimeout(() => setUser(dummyUser), 1000);
//   }, []);

//   if (!user) return <div className="loading">Loading Profile...</div>;

//   return (
//     <div className="profile-bg">
//       <div className="container py-5 d-flex justify-content-center align-items-center min-vh-100">
//         <div className="glass-card row w-100 p-4 shadow-lg rounded" style={{ maxWidth: '960px' }}>
//           {/* Profile Image Section */}
//           <div className="col-md-4 d-flex flex-column align-items-center justify-content-center text-center">
//             <img
//               src={user.imageUrl}
//               alt="Profile"
//               className="profile-pic-glass shadow"
//             />
//             <h5 className="mt-3">{user.userName}</h5>
//             <p className="text-muted">{user.userRole}</p>
//           </div>

//           {/* User Info Section */}
//           <div className="col-md-8 mt-4 mt-md-0">
//             <h4 className="mb-4 border-bottom pb-2">User Profile</h4>
//             <div className="row g-3">
//               <div className="col-md-6">
//                 <label className="form-label">User Name</label>
//                 <input className="form-control custom-input" value={user.userName} readOnly />
//               </div>
//               <div className="col-md-6">
//                 <label className="form-label">Email</label>
//                 <input className="form-control custom-input" value={user.userEmail} readOnly />
//               </div>
//               <div className="col-md-6">
//                 <label className="form-label">Gender</label>
//                 <input className="form-control custom-input" value={user.gender} readOnly />
//               </div>
//               <div className="col-md-6">
//                 <label className="form-label">Phone Number</label>
//                 <input className="form-control custom-input" value={user.phoneNumber} readOnly />
//               </div>
//               <div className="col-md-6">
//                 <label className="form-label">Alternate Phone</label>
//                 <input className="form-control custom-input" value={user.alterPhone} readOnly />
//               </div>

//               {/* Address Section */}
//               <div className="col-md-6">
//                 <label className="form-label">Address Line 1</label>
//                 <input className="form-control custom-input" value={user.addressLine1} readOnly />
//               </div>
//               <div className="col-md-6">
//                 <label className="form-label">Address Line 2</label>
//                 <input className="form-control custom-input" value={user.addressLine2} readOnly />
//               </div>
//               <div className="col-md-6">
//                 <label className="form-label">District</label>
//                 <input className="form-control custom-input" value={user.district} readOnly />
//               </div>
//               <div className="col-md-6">
//                 <label className="form-label">State</label>
//                 <input className="form-control custom-input" value={user.state} readOnly />
//               </div>
//               <div className="col-md-6">
//                 <label className="form-label">Pincode</label>
//                 <input className="form-control custom-input" value={user.pincode} readOnly />
//               </div>

//               <div className="col-12 text-end">
//                 <button className="btn custom-btn">Edit Profile</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/UserProfile.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const dummyUser = {
      userName: 'Aman Gupta',
      addressLine1: 'Flat No. 203, Palm Residency',
      addressLine2: 'Near Infinity Mall, Andheri West',
      district: 'Mumbai Suburban',
      state: 'Maharashtra',
      pincode: '400053',
      dateOfBirth: '21-09-1992',
      gender: 'Male',
      phoneNumber: '+91-9876543210',
      alterPhone: '+91-9123456780',
      userEmail: 'ag@gmail.com',
      userPassword: 'password123',
      imageUrl: 'https://randomuser.me/api/portraits/men/73.jpg',
      userRole: 'User',
    };

    setTimeout(() => setUser(dummyUser), 1000);
  }, []);

  if (!user) return <div className="loading">Loading Profile...</div>;

  return (
    <div className="profile-bg">
      <div className="container py-5 d-flex justify-content-center align-items-center min-vh-100">
        <div className="glass-card row w-100 p-4 shadow-lg rounded" style={{ maxWidth: '1000px' }}>
          
          {/* Profile Image & Name */}
          <div className="col-md-4 text-center d-flex flex-column align-items-center justify-content-center">
            <img src={user.imageUrl} alt="Profile" className="profile-pic-glass shadow" />
            <h4 className="mt-3 fw-bold">{user.userName}</h4>
            <span className="text-muted">{user.userRole}</span>
          </div>

          {/* User Info */}
          <div className="col-md-8 mt-4 mt-md-0">
            <h4 className="mb-3 border-bottom pb-2 text-purple">Personal Information</h4>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">User Name</label>
                <input className="form-control custom-input" value={user.userName} readOnly />
              </div>
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input className="form-control custom-input" value={user.userEmail} readOnly />
              </div>
              <div className="col-md-6">
                <label className="form-label">Gender</label>
                <input className="form-control custom-input" value={user.gender} readOnly />
              </div>
              <div className="col-md-6">
                <label className="form-label">Date of Birth</label>
                <input className="form-control custom-input" value={user.dateOfBirth} readOnly />
              </div>
              <div className="col-md-6">
                <label className="form-label">Phone Number</label>
                <input className="form-control custom-input" value={user.phoneNumber} readOnly />
              </div>
              <div className="col-md-6">
                <label className="form-label">Alternate Phone</label>
                <input className="form-control custom-input" value={user.alterPhone} readOnly />
              </div>
            </div>

            <h4 className="mt-4 mb-3 border-bottom pb-2 text-purple">Address Information</h4>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Address Line 1</label>
                <input className="form-control custom-input" value={user.addressLine1} readOnly />
              </div>
              <div className="col-md-6">
                <label className="form-label">Address Line 2</label>
                <input className="form-control custom-input" value={user.addressLine2} readOnly />
              </div>
              <div className="col-md-4">
                <label className="form-label">District</label>
                <input className="form-control custom-input" value={user.district} readOnly />
              </div>
              <div className="col-md-4">
                <label className="form-label">State</label>
                <input className="form-control custom-input" value={user.state} readOnly />
              </div>
              <div className="col-md-4">
                <label className="form-label">Pincode</label>
                <input className="form-control custom-input" value={user.pincode} readOnly />
              </div>
            </div>

            <div className="text-end mt-4">
              <button className="btn custom-btn">Edit Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

