import React, { useState, useEffect } from 'react';
import { Slider } from '@mui/material';

const TripFilter = ({ onFilterChange = () => {} }) => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [departureRange, setDepartureRange] = useState([0, 24]);
  const [remainingSeats, setRemainingSeats] = useState([1, 50]);

  // useEffect to send updated filters on any change
  useEffect(() => {
    onFilterChange({
      ...(source && { source }),
      ...(destination && { destination }),
      ...(priceRange && { priceRange }),
      ...(departureRange && { departureRange }),
      ...(remainingSeats && { remainingSeats }),
    });
  }, [source, destination, priceRange, departureRange, remainingSeats]);

  return (
    <div className="w-full lg:w-80 p-4 border-r border-gray-200 bg-white shadow-sm">
      <h4 className="text-xl fw-bold text-gray-800" style={{ marginBottom: '1.5rem' }}>
        Filter Results
      </h4>

      {/* Source */}
      <div className="mb-6" style={{ marginBottom: '1.5rem' }}>
        <h6 className="text-sm font-medium text-gray-700 mb-1">Source</h6>
        <input
          type="text"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          placeholder="Enter source"
          className="w-100 p-2 border rounded text-sm"
        />
      </div>

      {/* Destination */}
      <div className="mb-6" style={{ marginBottom: '1.5rem' }}>
        <h6 className="text-sm font-medium text-gray-700 mb-1">Destination</h6>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Enter destination"
          className="w-100 p-2 border rounded text-sm"
        />
      </div>

      {/* Price Range */}
      <div className="mb-6" style={{ marginBottom: '1.5rem' }}>
        <h6 className="text-sm font-medium text-gray-700 mb-2">Price Range (₹)</h6>
        <Slider
          value={priceRange}
          onChange={(e, newVal) => setPriceRange(newVal)}
          valueLabelDisplay="auto"
          min={0}
          max={10000}
          step={100}
        />
        <div className="text-xs text-gray-600">
          ₹{priceRange[0]} - ₹{priceRange[1]}
        </div>
      </div>

      {/* Departure Time */}
      <div className="mb-6" style={{ marginBottom: '1.5rem' }}>
        <h6 className="text-sm font-medium text-gray-700 mb-2">Departure Time (24hr)</h6>
        <Slider
          value={departureRange}
          onChange={(e, newVal) => setDepartureRange(newVal)}
          valueLabelDisplay="auto"
          min={0}
          max={24}
          step={1}
        />
        <div className="text-xs text-gray-600">
          {departureRange[0]}:00 - {departureRange[1]}:00
        </div>
      </div>

      {/* Remaining Seats */}
      <div className="mb-6" style={{ marginBottom: '1.5rem' }}>
        <h6 className="text-sm font-medium text-gray-700 mb-2">Remaining Seats</h6>
        <Slider
          value={remainingSeats}
          onChange={(e, newVal) => setRemainingSeats(newVal)}
          valueLabelDisplay="auto"
          min={1}
          max={50}
        />
        <div className="text-xs text-gray-600">
          {remainingSeats[0]} - {remainingSeats[1]} seats
        </div>
      </div>
    </div>
  );
};

export default TripFilter;
