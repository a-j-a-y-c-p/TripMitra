import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../CSS/UserProfile.css';
import { AuthContext } from '../contexts/AuthContext';
import authAxios from '../api/axiosConfig';

const UpdateProfile = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const dashboardPath = user?.role === 'ADMIN' ? "/admin_dashboard" : "/dashboard";

  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    gender: '',
    dateOfBirth: '',
    phoneNumber: '',
    alterPhone: '',
    addressLine1: '',
    addressLine2: '',
    district: '',
    state: '',
    pincode: '',
    imageUrl: '',
    userRole: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = user?.userId;
    if (!userId) {
      console.warn('User not found');
      setLoading(false);
      return;
    }

    const fetchProfileData = async () => {
      try {
        const [basicRes, addressRes, prefRes] = await Promise.all([
          authAxios.get(`/users/getUser/${userId}`),
          authAxios.get(`/api/addresses/addressGet`),
          authAxios.get(`/userdetails/userdetailsGet`),
        ]);

        setFormData({
          userName: basicRes.data.userName || '',
          userEmail: basicRes.data.userEmail || '',
          userRole: basicRes.data.userRole || '',
          gender: prefRes.data.gender || '',
          dateOfBirth: prefRes.data.dateOfBirth || '',
          phoneNumber: prefRes.data.phoneNumber || '',
          alterPhone: prefRes.data.alterPhone || '',
          imageUrl: prefRes.data.imageUrl || '',
          addressLine1: addressRes.data.addressLine1 || '',
          addressLine2: addressRes.data.addressLine2 || '',
          district: addressRes.data.district || '',
          state: addressRes.data.state || '',
          pincode: addressRes.data.pincode || '',
        });
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, imageUrl }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = user?.userId;
    if (!userId) return alert('User not found');

    const today = new Date().toISOString().split("T")[0];
    if (formData.dateOfBirth > today) {
      return alert("Date of birth cannot be a future date");
    }

    try {
      await Promise.all([
        authAxios.put(`/users/update`, {
          userName: formData.userName,
          userEmail: formData.userEmail,
          userRole: formData.userRole,
        }),
        authAxios.put(`/api/addresses/addressPut`, {
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          district: formData.district,
          state: formData.state,
          pincode: formData.pincode,
        }),
        authAxios.put(`/userdetails/userdetailsPut`, {
          gender: formData.gender,
          dateOfBirth: formData.dateOfBirth,
          phoneNumber: formData.phoneNumber,
          alterPhone: formData.alterPhone,
          imageUrl: formData.imageUrl,
        }),
      ]);

      alert('Profile updated successfully');
      navigate(dashboardPath);
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update profile. Please try again.');
    }
  };

  if (loading) return <div className="loading">Loading Profile...</div>;

  return (
    <div className="profile-bg">
      <form className="row" onSubmit={handleSubmit}>
        {/* Profile Image & Name */}
        <div className="col-md-4 text-center d-flex flex-column align-items-center justify-content-center">
          <div className="position-relative">
            <img
              src={formData.imageUrl || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="profile-pic-glass shadow"
              style={{
                width: '150px',
                height: '150px',
                objectFit: 'cover',
                borderRadius: '50%',
              }}
            />
            <label
              htmlFor="upload-image"
              className="position-absolute bottom-0 end-0 bg-light p-2 rounded-circle shadow"
              style={{ cursor: 'pointer' }}
            >
              <i className="bi bi-camera-fill"></i>
            </label>
            <input
              id="upload-image"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
          </div>
          <h4 className="mt-3 fw-bold">{formData.userName}</h4>
          <span className="text-muted">{formData.userRole}</span>
        </div>

        {/* Editable Info */}
        <div className="col-md-8 mt-4 mt-md-0">
          <h4 className="mb-3 border-bottom pb-2 text-purple">Edit Personal Information</h4>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">User Name</label>
              <input
                name="userName"
                className="form-control custom-input"
                value={formData.userName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Gender</label>
              <select
                name="gender"
                className="form-select custom-input"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                className="form-control custom-input"
                value={formData.dateOfBirth}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
                required
              />
            </div>
          </div>

          <h4 className="mt-4 mb-3 border-bottom pb-2 text-purple">Edit Address Information</h4>
          <div className="row g-3">
            {[
              ['Address Line 1', 'addressLine1'],
              ['Address Line 2', 'addressLine2'],
              ['District', 'district'],
              ['State', 'state'],
              ['Pincode', 'pincode'],
            ].map(([label, name], idx) => (
              <div className={`col-md-${name === 'pincode' ? 4 : 6}`} key={idx}>
                <label className="form-label">{label}</label>
                <input
                  name={name}
                  className="form-control custom-input"
                  value={formData[name]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
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
