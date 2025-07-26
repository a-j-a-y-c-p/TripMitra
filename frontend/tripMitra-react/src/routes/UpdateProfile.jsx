import React, { useState } from 'react';

const UpdateProfile = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
    console.log('Updated Profile:', form);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-3">Update Profile</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" name="name" className="form-control" value={form.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input type="tel" name="phone" className="form-control" value={form.phone} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-success">Update</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
