import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import UserList from '../components/UserList';
import UserFilter from '../components/UserFilter';

const ManageUser = () => {
  const [filters, setFilters] = useState({}); // ✅ Track filters here

  return (
    <div className="container-fluid bg-light py-3">
      <div className="row g-3"> 
        <div className="col-sm-12 col-md-3 ">
          <Navigation />
        </div>
        <div className="col-sm-12 col-md-6 px-0 ">
          <UserList filters={filters} /> {/* ✅ Pass filters */}
        </div>
        <div className="col-sm-12 col-md-3">
          <UserFilter onFilterChange={setFilters} /> {/* ✅ Receive filters */}
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
