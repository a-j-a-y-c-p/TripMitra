import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import 'bootstrap/dist/css/bootstrap.min.css';

const TripHistory = () => {
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const username = 'admin';
  const password = 'TripAdmin';
  const userId = 1; // TODO: Set dynamically (e.g., from useParams or auth)

  // Current date for filtering past trips
  const currentDate = new Date('2025-07-27');

  // Fetch trips from backend on component mount
  useEffect(() => {
    const fetchTrips = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/members/getalltrips/${userId}`,
          {
            auth: { username, password }
          }
        );
        if (!Array.isArray(response.data)) {
                  throw new Error('Expected an array of trip IDs');
                }
        
                // Step 2: Fetch full trip details for each trip ID
                const tripPromises = response.data.map(tripId =>
                  api.get(`/trips/${tripId}`, {
                    auth: { username, password }
                  })
                );
                const tripResponses = await Promise.all(tripPromises);
                const tripData = tripResponses.map(res => res.data);
                setTrips(tripData);
        
                setError(null);
              } catch (err) {
                setError('Failed to fetch trips. Please try again.');
                console.error('Error fetching trips:', err);
              } finally {
                setIsLoading(false);
              }
            };
            fetchTrips();
          }, [userId]);
  return (
    <div className="container mt-4 mt-md-5">
      <h1 className="text-center mb-4 fs-3 fs-md-2">Trip History</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {isLoading && (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {/* Trip History Cards */}
      <div className="row justify-content-center g-2">
        <div className="col-12 col-md-8">
          {trips.length === 0 && !isLoading && (
            <p className="text-center">No past trips found.</p>
          )}
          {trips.length > 0 && (
            <>
               {trips.map(trip => (
                <div key={trip.id} className="mb-4">
                  <div className="card shadow-sm border-0" style={{ borderRadius: '8px' }}>
                    <div className="card-body d-flex justify-content-between align-items-center">
                      {/* Left section: route and dates */}
                      <div>
                        <h5 className="fw-bold mb-1" style={{ fontSize: '1.25rem' }}>
                          {trip.tripDetails?.source || 'N/A'} → {trip.tripDetails?.destination || 'N/A'}
                        </h5>
                        <p className="mb-1 text-muted" style={{ fontSize: '0.9rem' }}>
                          {trip.tripDetails?.startDate || 'N/A'} – {trip.tripDetails?.endDate || 'N/A'}
                        </p>
                      </div>

                      {/* Middle section: details */}
                      <div className="text-center">
                        <p className="mb-1">
                          <strong>Mode:</strong> {trip.mode || 'N/A'}
                        </p>
                        <p className="mb-1">
                          <strong>Members:</strong> {trip.curMembers}/{trip.maxMembers}
                        </p>
                      </div>

                      {/* Right section: cost and buttons */}
                      <div className="text-end">
                        <p className="mb-2 fw-bold" style={{ fontSize: '1.25rem' }}>
                          ₹{trip.estimateCost}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripHistory;