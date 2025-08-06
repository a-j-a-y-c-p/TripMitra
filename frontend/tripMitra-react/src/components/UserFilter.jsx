import React, { useState, useEffect } from 'react';
import _ from 'lodash';

const UserFilter = ({ onFilterChange = () => {} }) => {
  const [gender, setGender] = useState('');
  const [isBlocked, setIsBlocked] = useState('');
  const [keyword, setKeyword] = useState('');

  // Debounced filter change
  useEffect(() => {
    const filters = {
      ...(gender && { gender }),
      ...(isBlocked !== '' && { isBlocked: isBlocked === 'true' }),
      ...(keyword && { keyword })
    };

    const debounced = _.debounce(() => onFilterChange(filters), 300);
    debounced();

    return () => debounced.cancel();
  }, [gender, isBlocked, keyword]);

  return (
    <div className="p-4 border-end bg-white"
          style={{ height: "100%"}}>
      <h4 className="fw-bold text-center mb-4">User Filters</h4>

      <div className="mb-3">
        <label>Gender</label>
        <select className="form-select" value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <div className="mb-3">
        <label>Status</label>
        <select className="form-select" value={isBlocked} onChange={(e) => setIsBlocked(e.target.value)}>
          <option value="">All</option>
          <option value="true">Blocked</option>
          <option value="false">Active</option>
        </select>
      </div>

      <div className="mb-3">
        <label>Search</label>
        <input
          className="form-control"
          type="text"
          placeholder="Username or Email"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
    </div>
  );
};

export default UserFilter;
