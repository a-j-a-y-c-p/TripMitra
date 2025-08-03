import { bottom } from '@popperjs/core';
import React from 'react';

const TripList = () => {
  const trips = [
    {
      tripId: 1,
      source: "Delhi",
      destination: "Manali",
      startDate: "2025-08-01",
      endDate: "2025-08-05",
      curMembers: 4,
      maxMembers: 8,
      estimateCost: 6500,
      mode: "Bus",
    },
    {
      tripId: 2,
      source: "Mumbai",
      destination: "Goa",
      startDate: "2025-08-10",
      endDate: "2025-08-14",
      curMembers: 3,
      maxMembers: 6,
      estimateCost: 7200,
      mode: "Train",
    },
    {
      tripId: 3,
      source: "Bangalore",
      destination: "Coorg",
      startDate: "2025-08-15",
      endDate: "2025-08-18",
      curMembers: 5,
      maxMembers: 10,
      estimateCost: 5800,
      mode: "Car",
    },
    {
      tripId: 4,
      source: "Kolkata",
      destination: "Darjeeling",
      startDate: "2025-09-01",
      endDate: "2025-09-05",
      curMembers: 2,
      maxMembers: 5,
      estimateCost: 4900,
      mode: "Bus",
    },
    {
      tripId: 5,
      source: "Chennai",
      destination: "Ooty",
      startDate: "2025-09-10",
      endDate: "2025-09-13",
      curMembers: 6,
      maxMembers: 10,
      estimateCost: 6100,
      mode: "Car",
    },
    {
      tripId: 6,
      source: "Pune",
      destination: "Lonavala",
      startDate: "2025-09-20",
      endDate: "2025-09-21",
      curMembers: 3,
      maxMembers: 6,
      estimateCost: 3200,
      mode: "Bike",
    },
    {
      tripId: 7,
      source: "Hyderabad",
      destination: "Hampi",
      startDate: "2025-10-01",
      endDate: "2025-10-04",
      curMembers: 4,
      maxMembers: 8,
      estimateCost: 5400,
      mode: "Train",
    },
    {
      tripId: 8,
      source: "Ahmedabad",
      destination: "Udaipur",
      startDate: "2025-10-12",
      endDate: "2025-10-15",
      curMembers: 5,
      maxMembers: 9,
      estimateCost: 5600,
      mode: "Car",
    },
    {
      tripId: 9,
      source: "Lucknow",
      destination: "Nainital",
      startDate: "2025-10-20",
      endDate: "2025-10-24",
      curMembers: 4,
      maxMembers: 8,
      estimateCost: 6000,
      mode: "Bus",
    },
    {
      tripId: 10,
      source: "Jaipur",
      destination: "Mount Abu",
      startDate: "2025-11-01",
      endDate: "2025-11-03",
      curMembers: 3,
      maxMembers: 6,
      estimateCost: 4900,
      mode: "Car",
    },
    {
      tripId: 11,
      source: "Nagpur",
      destination: "Pachmarhi",
      startDate: "2025-11-10",
      endDate: "2025-11-13",
      curMembers: 2,
      maxMembers: 5,
      estimateCost: 5300,
      mode: "Train",
    },
    {
      tripId: 12,
      source: "Bhopal",
      destination: "Kanha",
      startDate: "2025-11-20",
      endDate: "2025-11-24",
      curMembers: 4,
      maxMembers: 8,
      estimateCost: 6700,
      mode: "Bus",
    },
  ];

  return (
    <div className="h-100 overflow-auto px-3 py-2" style={{ maxHeight: '100vh' }}>
      <h4 className="text-xl text-center fw-bold  text-gray-800" style={{margin: '1.5rem'}}>Trip List</h4>
      {trips.map((trip) => (
        <div
          key={trip.tripId}
          className="card mb-4 shadow-sm border-0"
          style={{ borderRadius: "8px" }}
        >
          <div className="card-body d-flex justify-content-between align-items-center">
            {/* Left section: route and dates */}
            <div>
              <h5 className="fw-bold mb-1" style={{ fontSize: "1.25rem" }}>
                {trip.source} → {trip.destination}
              </h5>
              <p className="mb-1 text-muted" style={{ fontSize: "0.9rem" }}>
                {trip.startDate} – {trip.endDate}
              </p>
            </div>

            {/* Middle section: details */}
            <div className="text-center">
              <p className="mb-1"><strong>Mode:</strong> {trip.mode}</p>
              <p className="mb-1">
                <strong>Members:</strong> {trip.curMembers}/{trip.maxMembers}
              </p>
            </div>

            {/* Right section: cost and button */}
            <div className="text-end">
              <p className="mb-2 fw-bold" style={{ fontSize: "1.25rem" }}>
                ₹{trip.estimateCost}
              </p>
              <button className="btn btn-primary btn-sm">View Details</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TripList;

