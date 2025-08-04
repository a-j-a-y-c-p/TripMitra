import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosConfig';

const TripList = ({ filters }) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const username = 'admin';
  const password = 'TripAdmin';

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);

        // Build query params from filters
        // const queryParams = new URLSearchParams({
        //   ...(filters.source && { source: filters.source }),
        //   ...(filters.destination && { destination: filters.destination }),
        //   ...(filters.priceRange && {
        //     minPrice: filters.priceRange[0],
        //     maxPrice: filters.priceRange[1]
        //   }),
        //   ...(filters.departureRange && {
        //     minDeparture: filters.departureRange[0],
        //     maxDeparture: filters.departureRange[1]
        //   }),
        //   ...(filters.remainingSeats && {
        //     minSeats: filters.remainingSeats[0],
        //     maxSeats: filters.remainingSeats[1]
        //   })
        // });

        const response = await axiosInstance.get(`/trips/filter?${queryParams.toString()}`, {
          auth: { username, password }
        });

        setTrips(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load trips.');
        setLoading(false);
      }
    };

    fetchTrips();
  }, [filters]);

  return (
    <div className="h-100 overflow-auto px-3 py-2" style={{ maxHeight: '100vh' }}>
      <h4 className="text-xl text-center fw-bold text-gray-800" style={{ margin: '1.5rem' }}>
        Trip List
      </h4>

      {loading && <p className="text-center text-muted">Loading trips...</p>}
      {error && <p className="text-center text-danger">{error}</p>}

      {trips.map((trip) => (
        <div
          key={trip.tripId}
          className="card mb-4 shadow-sm border-0"
          style={{ borderRadius: '8px' }}
        >
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <h5 className="fw-bold mb-1" style={{ fontSize: '1.25rem' }}>
                {trip.tripDetails.source} → {trip.tripDetails.destination}
              </h5>
              <p className="mb-1 text-muted" style={{ fontSize: '0.9rem' }}>
                {trip.tripDetails.startDate} – {trip.tripDetails.endDate}
              </p>
            </div>

            <div className="text-center">
              <p className="mb-1"><strong>Mode:</strong> {trip.mode}</p>
              <p className="mb-1"><strong>Members:</strong> {trip.curMembers}/{trip.maxMembers}</p>
            </div>

            <div className="text-end">
              <p className="mb-2 fw-bold" style={{ fontSize: '1.25rem' }}>
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


import React, { useEffect, useState } from "react";
import axios from "axios";

const TripList = () => {
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/api/trips")
      .then(response => {
        setTrips(response.data);
        setError(""); // clear error if successful
      })
      .catch(err => {
        console.error("Error fetching trips:", err);
        setError("Failed to load trips.");
      });
  }, []);

  if (error) {
    return <div className="text-red-600 font-bold">{error}</div>;
  }

  if (trips.length === 0) {
    return <div>No trips available</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {trips.map(trip => (
        <div key={trip.id} className="p-4 border shadow rounded">
          <h2 className="text-xl font-bold mb-2">{trip.destination}</h2>
          <p>Price: ₹{trip.price}</p>
          <p>Date: {trip.date}</p>
        </div>
      ))}
    </div>
  );
};

export default TripList;

