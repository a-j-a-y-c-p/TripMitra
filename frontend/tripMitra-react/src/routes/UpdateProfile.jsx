import React, { useState, useEffect } from 'react';
import '../CSS/UpdateProfile.css';

const UpdateProfile = ({ userId }) => {
  const [formData, setFormData] = useState({
    userDetailsId: '',
    phoneNumber: '',
    alterPhone: '',
    gender: '',
    dateOfBirth: '',
    addressId: '',
    imageUrl: '',
    isTripHost: false,
  });

  useEffect(() => {
    // Simulate fetching current user data
    const dummyUser = {
      userDetailsId: 'USR123456',
      phoneNumber: '+91-9876543210',
      alterPhone: '+91-9123456780',
      gender: 'Male',
      dateOfBirth: '1998-04-25',
      addressId: 'ADDR7890',
      imageUrl: 'https://randomuser.me/api/portraits/men/75.jpg',
      isTripHost: true,
    };

    setTimeout(() => {
      setFormData(dummyUser);
    }, 1000);
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated data:', formData);
    // TODO: Make API call to save data
  };

  return (
    <div className="update-wrapper">
      <form className="update-container glass" onSubmit={handleSubmit}>
        <div className="profile-image">
          <img src={formData.imageUrl || '/default-profile.png'} alt="User" />
        </div>
        <h2>Update Profile</h2>

        <input
          type="text"
          name="userDetailsId"
          value={formData.userDetailsId}
          onChange={handleChange}
          placeholder="User ID"
          disabled // Optional: remove if editable
        />

        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
          required
        />

        <input
          type="text"
          name="alterPhone"
          value={formData.alterPhone}
          onChange={handleChange}
          placeholder="Alternate Phone Number"
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="addressId"
          value={formData.addressId}
          onChange={handleChange}
          placeholder="Address ID"
          required
        />

        <label className="checkbox-label">
          <input
            type="checkbox"
            name="isTripHost"
            checked={formData.isTripHost}
            onChange={handleChange}
          />
          Trip Host?
        </label>

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
