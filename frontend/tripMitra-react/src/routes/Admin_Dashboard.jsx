import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Admin_Dashboard.css';

const Admin_Dashboard = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  const cards = [
    {
      title: 'Manage Users',
      description: 'Add, block, remove users and manage permissions',
      path: '/manage-users',
      color: 'primary',
    },
    {
      title: 'Manage Trips',
      description: 'Create, delete, or update trip data',
      path: '/manage-trips',
      color: 'success',
    },
    {
      title: 'Active Trips',
      description: 'Monitor all currently running trips',
      path: '/active-trips',
      color: 'warning',
    },
    {
      title: 'Cancelled Trips',
      description: 'Review all trips that were cancelled',
      path: '/cancelled-trips',
      color: 'danger',
    },
  ];

  return (
    <div className={`bg-light min-vh-100 py-4 px-3 ${fadeIn ? 'fade-in' : ''}`}>
      <div className="container">
        <h2 className="text-center fw-bold mb-5 fs-2">Admin Dashboard</h2>
        <div className="row g-4 justify-content-center">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="col-sm-6 col-lg-4"
              onClick={() => navigate(card.path)}
              style={{ cursor: 'pointer' }}
            >
              <div className={`card h-100 text-white bg-${card.color} shadow-lg rounded-4 hover-card transition`}>
                <div className="card-body text-center py-5 px-4">
                  <h5 className="card-title fw-semibold fs-4 mb-3">{card.title}</h5>
                  <p className="card-text fs-6">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin_Dashboard;
