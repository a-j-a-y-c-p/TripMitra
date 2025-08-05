import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/UserProfile.css';

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    addressLine1: '',
    addressLine2: '',
    district: '',
    state: '',
    pincode: '',
    dateOfBirth: '',
    gender: '',
    phoneNumber: '',
    alterPhone: '',
    userEmail: '',
    userPassword: '',
    imageUrl: '',
    userRole: '',
  });

  useEffect(() => {
    const dummyUser = {
      userName: 'Aman Gupta',
      addressLine1: 'Flat No. 203, Palm Residency',
      addressLine2: 'Near Infinity Mall, Andheri West',
      district: 'Mumbai Suburban',
      state: 'Maharashtra',
      pincode: '400053',
      dateOfBirth: '1992-09-21',
      gender: 'Male',
      phoneNumber: '+91-9876543210',
      alterPhone: '+91-9123456780',
      userEmail: 'ag@gmail.com',
      userPassword: 'password123',
      imageUrl: 'https://randomuser.me/api/portraits/men/73.jpg',
      userRole: 'User',
    };

    setFormData(dummyUser);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Profile:', formData);

    setTimeout(() => {
      alert('Changes Saved');
      navigate('/dashboard');
    }, 500);
  };

  return (
    <div className="profile-bg">
      <form className="row" onSubmit={handleSubmit}>
        {/* Profile Image & Name */}
        <div className="col-md-4 text-center d-flex flex-column align-items-center justify-content-center">
          <img
            src={formData.imageUrl}
            alt="Profile"
            className="profile-pic-glass shadow"
          />
          <h4 className="mt-3 fw-bold">{formData.userName}</h4>
          <span className="text-muted">{formData.userRole}</span>
        </div>

        {/* Editable Info */}
        <div className="col-md-8 mt-4 mt-md-0">
          <h4 className="mb-3 border-bottom pb-2 text-purple">
            Edit Personal Information
          </h4>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">User Name</label>
              <input
                name="userName"
                className="form-control custom-input"
                value={formData.userName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                name="userEmail"
                className="form-control custom-input"
                value={formData.userEmail}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Gender</label>
              <input
                name="gender"
                className="form-control custom-input"
                value={formData.gender}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                className="form-control custom-input"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Phone Number</label>
              <input
                name="phoneNumber"
                className="form-control custom-input"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Alternate Phone</label>
              <input
                name="alterPhone"
                className="form-control custom-input"
                value={formData.alterPhone}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Profile Photo</label>
              <input
                name="imageUrl"
                className="form-control custom-input"
                value={formData.imageUrl}
                onChange={handleChange}
              />
            </div>
          </div>

          <h4 className="mt-4 mb-3 border-bottom pb-2 text-purple">
            Edit Address Information
          </h4>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Address Line 1</label>
              <input
                name="addressLine1"
                className="form-control custom-input"
                value={formData.addressLine1}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Address Line 2</label>
              <input
                name="addressLine2"
                className="form-control custom-input"
                value={formData.addressLine2}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">District</label>
              <input
                name="district"
                className="form-control custom-input"
                value={formData.district}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">State</label>
              <input
                name="state"
                className="form-control custom-input"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Pincode</label>
              <input
                name="pincode"
                className="form-control custom-input"
                value={formData.pincode}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="text-end mt-4">
            <button type="submit" className="btn custom-btn">
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
