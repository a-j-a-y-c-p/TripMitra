import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/UserProfile.css';
import { AuthContext } from '../contexts/AuthContext';
import authAxios from '../api/axiosConfig'; // <-- using your pre-configured axios

const UserProfile = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const [basicInfo, setBasicInfo] = useState({});
  const [addressInfo, setAddressInfo] = useState({});
  const [preferences, setPreferences] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const userId =  user?.userId;

      if (!userId) {
        console.log("User not available yet");
        setLoading(false); // Prevent infinite loader
        return;
      }

      try {
        console.log("Fetching data for user ID:", userId);

        const [basicRes, addressRes, prefRes] = await Promise.all([
          authAxios.get(`/users/getUser/${userId}`),
          authAxios.get(`/api/addresses/addressGet`),
          authAxios.get(`/userdetails/userdetailsGet`),
        ]);

        console.log("Fetched basic:", basicRes.data);
        console.log("Fetched address:", addressRes.data);
        console.log("Fetched preferences:", prefRes.data);

        setBasicInfo(basicRes.data);
        setAddressInfo(addressRes.data);
        setPreferences(prefRes.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleDeleteProfile = async (e) => {
    e.preventDefault();
    const confirmDelete = window.confirm('Are you sure you want to delete your profile? This action cannot be undone.');

    const userId = user?.userId;
    if (!confirmDelete || !userId) return;

    try {
      await Promise.all([
        authAxios.delete(`/users/deleteUser/${userId}`),
        authAxios.delete(`/api/addresses/${userId}`),
        authAxios.delete(`/userdetails/${userId}`),
      ]);

      alert('Your profile has been deleted.');
      logout();
      navigate('/login');
      window.location.reload();
    } catch (err) {
      console.error('Failed to delete profile:', err);
      alert('Error deleting profile. Please try again.');
    }
  };

  if (loading) return <div className="loading">Loading Profile...</div>;

  return (
    <div className="profile-bg position-relative min-vh-100">
      <div className="container pb-5">
        <div className="row">
          {/* Profile Image & Name */}
          <div className="col-md-4 text-center d-flex flex-column align-items-center justify-content-center">
            <img
              src={preferences.imageUrl || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="profile-pic-glass shadow"
            />
            <h4 className="mt-3 fw-bold">{basicInfo.userName}</h4>
            <span className="text-muted">{basicInfo.userRole}</span>
          </div>

          {/* User Info */}
          <div className="col-md-8 mt-4 mt-md-0">
            <h4 className="mb-3 border-bottom pb-2 text-purple">Personal Information</h4>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">User Name</label>
                <input className="form-control custom-input" value={basicInfo.userName || ''} readOnly />
              </div>
              <div className="col-md-6">
                <label className="form-label">Gender</label>
                <input className="form-control custom-input" value={preferences.gender || ''} readOnly />
              </div>
              <div className="col-md-6">
                <label className="form-label">Date of Birth</label>
                <input className="form-control custom-input" value={preferences.dateOfBirth || ''} readOnly />
              </div>
            </div>

            <h4 className="mt-4 mb-3 border-bottom pb-2 text-purple">Address Information</h4>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Address Line 1</label>
                <input className="form-control custom-input" value={addressInfo.addressLine1 || ''} readOnly />
              </div>
              <div className="col-md-6">
                <label className="form-label">Address Line 2</label>
                <input className="form-control custom-input" value={addressInfo.addressLine2 || ''} readOnly />
              </div>
              <div className="col-md-4">
                <label className="form-label">District</label>
                <input className="form-control custom-input" value={addressInfo.district || ''} readOnly />
              </div>
              <div className="col-md-4">
                <label className="form-label">State</label>
                <input className="form-control custom-input" value={addressInfo.state || ''} readOnly />
              </div>
              <div className="col-md-4">
                <label className="form-label">Pincode</label>
                <input className="form-control custom-input" value={addressInfo.pincode || ''} readOnly />
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

      {/* Bottom Center Delete Profile Link */}
      <div className="delete-profile-link text-center py-3">
        <a href="#" className="text-danger fw-bold" onClick={handleDeleteProfile}>
          Delete Profile
        </a>
      </div>
    </div>
  );
};

export default UserProfile;
