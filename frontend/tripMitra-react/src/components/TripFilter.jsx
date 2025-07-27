import React from 'react';

const TripFilter = () => {
  return (
    <div className="w-1/4 p-4 border-l border-gray-300">
      <h2 className="text-xl font-semibold mb-4">Filter Trips</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Filter by Date</label>
        <input type="date" className="border p-2 w-full rounded" />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Filter by Source</label>
        <input type="text" placeholder="Source" className="border p-2 w-full rounded" />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Filter by Destination</label>
        <input type="text" placeholder="Destination" className="border p-2 w-full rounded" />
      </div>

      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Apply Filters
      </button>
    </div>
  );
};

export default TripFilter;
