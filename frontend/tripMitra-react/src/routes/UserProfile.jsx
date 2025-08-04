import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ import useNavigate
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/UserProfile.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // ✅ initialize navigate

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
              <button className="btn custom-btn" onClick={() => navigate('/UpdateProfile')}>
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
