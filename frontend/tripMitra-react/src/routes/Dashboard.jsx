import React, { useState } from 'react';
import TripNavigation from '../components/TripNavigation';
import TripList from '../components/TripList';
import TripFilter from '../components/TripFilter';

const Dashboard = () => {
  const [filters, setFilters] = useState({}); // ✅ Track filters here

  return (
    <div className="container-fluid bg-light py-3">
      <div className="row g-3"> 
        <div className="col-sm-12 col-md-3 ">
          <TripNavigation />
        </div>
        <div className="col-sm-12 col-md-6 px-0 ">
          <TripList filters={filters} /> {/* ✅ Pass filters */}
        </div>
        <div className="col-sm-12 col-md-3">
          <TripFilter onFilterChange={setFilters} /> {/* ✅ Receive filters */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
