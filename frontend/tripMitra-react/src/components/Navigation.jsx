import React from "react";
import { Link } from 'react-router-dom';


const Navigation = () => {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-4 bg-light shadow"
      style={{ height: "100%"}}
    >
      <h4 className="mb-4 fw-bold text-center" style={{ fontSize: "1.5rem" }}>
        Navigation
      </h4>

      <div className="mb-3">
        <Link to="/manageUser" className="text-decoration-none text-dark">
          <div className="p-3 bg-white rounded hover-shadow" style={{ fontSize: "1.1rem" }}>
            Manage Users
          </div>
        </Link>
      </div>

      <div className="mb-3">
        <Link to="/adminmanagetrip" className="text-decoration-none text-dark">
          <div className="p-3 bg-white rounded hover-shadow" style={{ fontSize: "1.1rem" }}>
            Manage Trips
          </div>
        </Link>
      </div>

      <div className="mb-3">
        <Link to="/monitorTrips" className="text-decoration-none text-dark" state={{ status: 'Completed' }}>
            <div className="p-3 bg-white rounded hover-shadow" style={{ fontSize: "1.1rem" }}>
            Completed Trips
            </div>
        </Link>
        </div>

      <div className="mb-3">
        <Link to="/monitorTrips" className="text-decoration-none text-dark" state={{ status: 'Cancelled' }}>
          <div className="p-3 bg-white rounded hover-shadow" style={{ fontSize: "1.1rem" }}>
            Cancelled Trips
          </div>
        </Link>
      </div>
    </div>
  );
};


export default Navigation;