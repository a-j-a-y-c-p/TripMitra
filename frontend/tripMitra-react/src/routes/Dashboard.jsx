import React from 'react';
import TripNavigation from "../components/TripNavigation";
import TripList from "../components/TripList";
import TripFilter from "../components/TripFilter";

const Dashboard = () => {
  return (
    <div className="container-fluid bg-light min-vh-100 py-3">
      <div className="row g-3"> {/* g-3 adds gutter spacing between columns */}

        {/* TripNavigation */}
        <div className="col-12 col-md-3 border border-dark rounded p-3">
          <TripNavigation />
        </div>

        {/* TripList */}
        <div className="col-12 col-md-6 border border-dark rounded p-3">
          <TripList />
        </div>

        {/* TripFilter */}
        <div className="col-12 col-md-3 border border-dark rounded p-3">
          <TripFilter />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
