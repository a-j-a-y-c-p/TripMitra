import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import api from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userEmail: "",
    userName: "",
    userPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = "#fff";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
      setSubmitting(true);
    if (formData.userPassword !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await api.post("/auth/signup", {
        userEmail: formData.userEmail,
        userName: formData.userName,
        userPassword: formData.userPassword,
      });

      if (res.status === 200 || res.status === 201) {
        alert("Signup successful!");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      setError("Signup failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#fff",
        margin: 0,
        padding: 0,
      }}
    >
      <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Signup</h2>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              name="userName"
              required
              placeholder="Enter your username"
              value={formData.userName}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="userEmail"
              required
              placeholder="Enter your email"
              value={formData.userEmail}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control pe-5"
                name="userPassword"
                required
                placeholder="Enter password"
                value={formData.userPassword}
                onChange={handleChange}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="position-absolute"
                style={{
                  top: "50%",
                  right: "15px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#6c757d",
                  fontSize: "1.1rem"
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="mb-3">
            <label>Confirm Password</label>
            <div className="position-relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-control pe-5"
                name="confirmPassword"
                required
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="position-absolute"
                style={{
                  top: "50%",
                  right: "15px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#6c757d",
                  fontSize: "1.1rem"
                }}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={submitting} >
            
            
                
                  {submitting ? 'Signing up...' : 'Signup'}
          </button>
        </form>

        <div className="text-center mt-3">
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;