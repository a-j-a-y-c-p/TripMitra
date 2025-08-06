import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import authAxios from '../api/axiosConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/UserProfile.css';

const UpdateAccountSettings = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [contactData, setContactData] = useState({
    userEmail: '',
    phoneNumber: '',
    alterPhone: '',
  });

  const [errors, setErrors] = useState({
    phoneNumber: '',
    alterPhone: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [basicRes, prefRes] = await Promise.all([
          authAxios.get(`/users/getUser/${user?.userId}`),
          authAxios.get(`/userdetails/userdetailsGet`)
        ]);

        setContactData({
          userEmail: basicRes.data.userEmail || '',
          phoneNumber: prefRes.data.phoneNumber || '',
          alterPhone: prefRes.data.alterPhone || '',
        });
      } catch (err) {
        console.error('Failed to fetch contact info:', err);
      }
    };

    if (user?.userId) fetchData();
  }, [user]);

  const validatePhone = (name, value) => {
    if (!/^\d{10}$/.test(value)) {
      return 'Phone number must be 10 digits';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));

    // Validation on change
    if (name === 'phoneNumber' || name === 'alterPhone') {
      const error = validatePhone(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneError = validatePhone('phoneNumber', contactData.phoneNumber);
    const alterPhoneError = validatePhone('alterPhone', contactData.alterPhone);

    setErrors({ phoneNumber: phoneError, alterPhone: alterPhoneError });

    if (phoneError || alterPhoneError) {
      alert('Please fix the errors before submitting');
      return;
    }

    try {
      const [userRes, userDetailsRes] = await Promise.all([
        authAxios.get(`/users/getUser/${user?.userId}`),
        authAxios.get(`/userdetails/userdetailsGet`),
      ]);

      const fullUser = {
        ...userRes.data,
        userEmail: contactData.userEmail,
      };

      const fullDetails = {
        ...userDetailsRes.data,
        phoneNumber: contactData.phoneNumber,
        alterPhone: contactData.alterPhone,
      };

      await Promise.all([
        authAxios.put(`/users/update`, fullUser),
        authAxios.put(`/userdetails/userdetailsPut`, fullDetails),
      ]);

      alert('Contact information updated successfully');
      navigate(user?.role === 'ADMIN' ? "/admin_dashboard" : "/dashboard");
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update contact info');
    }
  };

  return (
    <div className="profile-bg">
      <div className="glass-card">
        <h4 className="mb-3">Update Contact Information</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              name="userEmail"
              value={contactData.userEmail}
              className="form-control custom-input"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              name="phoneNumber"
              value={contactData.phoneNumber}
              className={`form-control custom-input ${errors.phoneNumber ? 'is-invalid' : ''}`}
              onChange={handleChange}
            />
            {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Alternate Phone</label>
            <input
              name="alterPhone"
              value={contactData.alterPhone}
              className={`form-control custom-input ${errors.alterPhone ? 'is-invalid' : ''}`}
              onChange={handleChange}
            />
            {errors.alterPhone && <div className="invalid-feedback">{errors.alterPhone}</div>}
          </div>

          <div className="text-end">
            <button type="submit" className="btn custom-btn">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAccountSettings;
