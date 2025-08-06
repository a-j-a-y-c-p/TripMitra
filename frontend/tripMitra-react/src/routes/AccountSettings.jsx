import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import authAxios from '../api/axiosConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/UserProfile.css';

const AccountSettings = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [contactData, setContactData] = useState({
    userEmail: '',
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

  return (
    <div className="profile-bg">
      <div className="glass-card">
        <h4 className="mb-3">Account Settings</h4>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            value={contactData.userEmail}
            className="form-control custom-input"
            readOnly
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            value={contactData.phoneNumber}
            className="form-control custom-input"
            readOnly
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Alternate Phone</label>
          <input
            value={contactData.alterPhone}
            className="form-control custom-input"
            readOnly
          />
        </div>

        <div className="text-end">
          <button
            className="btn custom-btn"
            onClick={() => navigate('/updateaccountsettings')}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
