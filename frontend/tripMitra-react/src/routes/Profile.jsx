import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/UserProfile.css';
import { AuthContext } from '../contexts/AuthContext';
import { useParams } from "react-router-dom";
import authAxios from '../api/axiosConfig';

const Profile = () => {
  const navigate = useNavigate();
  //const { user } = useContext(AuthContext);
  const { id } = useParams();

  const [basicInfo, setBasicInfo] = useState({});
  const [addressInfo, setAddressInfo] = useState({});
  const [preferences, setPreferences] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = id;

      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const [basicRes, addressRes, prefRes] = await Promise.all([
          authAxios.get(`/users/getUser/${userId}`),
          authAxios.get(`/api/addresses/addressGet`),
          authAxios.get(`/userdetails/byUser/${userId}`),
        ]);

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
  }, [basicInfo]);

  const handleBlockUser = async () => {
    try {
      await authAxios.patch(`/userdetails/blockUser/${basicInfo.userId}`);
      alert('User block status updated.');
    } catch (err) {
      console.error('Error blocking user:', err);
    }
  };

  const handleDeleteUser = async () => {
    try {
        console.log(preferences);
      await authAxios.delete(`/userdetails/${preferences.userDetailsId}`);
      alert('User deleted successfully.');
      navigate('/manageUser');
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };
  
// const handleDeleteUser = async (userId) => {
//     try {
//       await axiosInstance.delete(`/userdetails/${userId}`);
//       setUsers(prev => prev.filter(user => user.userDetailsId !== userId));
//     } catch (err) {
//       console.error('Failed to delete user', err);
//     }
//   };

  const handleChangeRole = async () => {
  try {
    await authAxios.patch(`/users/changeRole/${basicInfo.userId}`);
    // Toggle role based on current value (ADMIN <-> USER)
    setBasicInfo(prev => ({
      ...prev,
      userRole: prev.userRole === 'USER' ? 'ADMIN' : 'USER'
    }));
  } catch (err) {
    console.error('Error changing user role:', err);
  }
};

  if (loading) return <div className="loading">Loading Profile...</div>;

  return (
    <div className="profile-bg position-relative min-vh-100">
      <div className="container pb-5">
        <div className="row">
          {/* Profile Image & Name & Buttons */}
          <div className="col-md-4 text-center d-flex flex-column align-items-center justify-content-center">
            <img
                src={
                    preferences.profileImageBase64
                    ? `data:image/jpeg;base64,${preferences.profileImageBase64}`
                    : 'https://via.placeholder.com/150'
                }
                alt="Profile"
                className="profile-pic-glass shadow"
                />
            <h4 className="mt-3 fw-bold">{basicInfo.userName}</h4>
            <span className="text-muted mb-3">
              {basicInfo.userRole === 'ADMIN' ? 'ADMIN' : 'USER'}
            </span>

            <div className="d-flex flex-column gap-2 w-75 mt-2">
              <button className="btn btn-primary" onClick={handleBlockUser}>
                {preferences.blocked ? 'UnBlock User' : 'Block User'} 
              </button>
              <button className="btn btn-primary" onClick={handleChangeRole}>
                {basicInfo.userRole === 'ADMIN' ? 'Demote to User' : 'Promote to Admin'}
              </button>
              <button className="btn btn-primary" onClick={handleDeleteUser}>
                Delete User
              </button>
            </div>
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
                <label className="form-label">Email</label>
                <input className="form-control custom-input" value={basicInfo.userEmail || ''} readOnly />
              </div>
              <div className="col-md-6">
                <label className="form-label">Gender</label>
                <input className="form-control custom-input" value={preferences.gender || ''} readOnly />
              </div>
              <div className="col-md-6">
                <label className="form-label">Date of Birth</label>
                <input className="form-control custom-input" value={preferences.dateOfBirth || ''} readOnly />
              </div>
              <div className="col-md-6">
                <label className="form-label">Phone Number</label>
                <input className="form-control custom-input" value={preferences.phoneNumber || ''} readOnly />
              </div>
              <div className="col-md-6">
                <label className="form-label">Alternate Phone</label>
                <input className="form-control custom-input" value={preferences.alterPhone || ''} readOnly />
              </div>
            </div>

            <h4 className="mt-4 mb-3 border-bottom pb-2 text-purple">Address Information</h4>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Address Line 1</label>
                <input className="form-control custom-input" value={preferences.address.addressLine1 || ''} readOnly />
              </div>
              <div className="col-md-6">
                <label className="form-label">Address Line 2</label>
                <input className="form-control custom-input" value={preferences.address.addressLine2 || ''} readOnly />
              </div>
              <div className="col-md-4">
                <label className="form-label">District</label>
                <input className="form-control custom-input" value={preferences.address.district || ''} readOnly />
              </div>
              <div className="col-md-4">
                <label className="form-label">State</label>
                <input className="form-control custom-input" value={preferences.address.state || ''} readOnly />
              </div>
              <div className="col-md-4">
                <label className="form-label">Pincode</label>
                <input className="form-control custom-input" value={preferences.address.pincode || ''} readOnly />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;


