

import React from "react";

const TripNavigation = () => {
  return (
    <div className="p-3 bg-light" >
      <h4 className="mb-4">Trip Menu</h4>
      <ul className="nav flex-column">
        <li className="nav-item">
          <a className="nav-link" href="/addtrip">➕ Add Trip</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/managetrip">🛠️ Manage Trip</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/triphistory">📜 Trip History</a>
        </li>
      </ul>
    </div>
  );
};

export default TripNavigation;

