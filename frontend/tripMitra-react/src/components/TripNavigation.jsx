

import React from "react";

const TripNavigation = () => {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-4 bg-light shadow"
      style={{ height: "100%"}}
    >
      <h4 className="mb-4 fw-bold text-center" style={{ fontSize: "1.5rem" }}>
        Trip Navigation
      </h4>

      <div className="mb-3">
        <a href="/addtrip" className="text-decoration-none text-dark">
          <div className="p-3 bg-white rounded hover-shadow" style={{ fontSize: "1.1rem" }}>
            ➕ Add Trip
          </div>
        </a>
      </div>

      <div className="mb-3">
        <a href="/managetrip" className="text-decoration-none text-dark">
          <div className="p-3 bg-white rounded hover-shadow" style={{ fontSize: "1.1rem" }}>
            🛠️ Manage Trip
          </div>
        </a>
      </div>

      <div>
        <a href="/triphistory" className="text-decoration-none text-dark">
          <div className="p-3 bg-white rounded hover-shadow" style={{ fontSize: "1.1rem" }}>
            📜 Trip History
          </div>
        </a>
      </div>
    </div>
  );
};


export default TripNavigation;

