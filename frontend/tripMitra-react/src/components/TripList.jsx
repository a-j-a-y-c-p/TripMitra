import React, { useEffect, useState } from 'react';

const TripList = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetch('/api/trips')  // adjust based on your Spring Boot endpoint
      .then(res => res.json())
      .then(data => setTrips(data));
  }, []);

  return (
    <div className="w-2/4 p-4 overflow-y-auto border-2">
      <h2 className="text-xl font-semibold mb-4">Your Trips</h2>
      <div className="grid gap-4">
        {trips.map(trip => (
          <div key={trip.tripId} className="border p-4 rounded shadow-md bg-white">
            <p><strong>Mode:</strong> {trip.mode}</p>
            <p><strong>Current Members:</strong> {trip.curMembers}</p>
            <p><strong>Max Members:</strong> {trip.maxMembers}</p>
            <p><strong>Estimated Cost:</strong> ₹{trip.estimateCost}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripList;
