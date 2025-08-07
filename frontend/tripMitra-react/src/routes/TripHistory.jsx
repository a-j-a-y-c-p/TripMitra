import React, { useState, useEffect, useContext } from 'react';
import api from '../api/axiosConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const TripHistory = () => {
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const userId = user?.userId;

  // Fetch trips from backend on component mount
  useEffect(() => {
    const fetchTrips = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/members/trips/all/${userId}`);
        if (!Array.isArray(response.data)) {
          throw new Error('Expected an array of trip IDs');
        }

        // Step 2: Fetch full trip details for each trip ID
        const tripPromises = response.data.map((tripId) =>
          api.get(`/trips/${tripId}`)
        );
        const tripResponses = await Promise.all(tripPromises);
        const tripData = tripResponses.map((res) => res.data);
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
              {trips.map((trip) => (
                <div key={trip.tripId} className="mb-4">
                  <div
                    className="card shadow-sm border-0"
                    style={{ borderRadius: '8px' }}
                  >
                    <div className="card-body d-flex justify-content-between align-items-center">
                      {/* Left section: route and dates */}
                      <div>
                        {/* <div>Trip : ${trip}</div> */}
                        <h5
                          className="fw-bold mb-1"
                          style={{ fontSize: '1.25rem' }}
                        >
                          {trip.tripDetails?.source || 'N/A'} →{' '}
                          {trip.tripDetails?.destination || 'N/A'}
                        </h5>
                        <p
                          className="mb-1 text-muted"
                          style={{ fontSize: '0.9rem' }}
                        >
                          {trip.tripDetails?.startDate || 'N/A'} –{' '}
                          {trip.tripDetails?.endDate || 'N/A'}
                        </p>
                      </div>

                      {/* Middle section: details */}
                      <div className="text-center">
                        <p className="mb-1">
                          <strong>Mode:</strong> {trip.mode || 'N/A'}
                        </p>
                        <p className="mb-1">
                          <strong>Members:</strong> {trip.currMembers}/
                          {trip.maxMembers}
                        </p>
                      </div>

                      {/* Right section: cost and status */}
                      <div className="text-end d-flex flex-column align-items-end">
                        <p
                          className="mb-2 fw-bold"
                          style={{ fontSize: '1.25rem' }}
                        >
                          ₹{trip.estimateCost}
                        </p>
                        {trip.status && (
                          <p
                            className="fw-bold mb-0"
                            style={{
                              fontSize: '0.9rem',
                              color:
                                trip.status === 'COMPLETED'
                                  ? 'orange'
                                  : trip.status === 'CANCELLED'
                                    ? 'red'
                                    : 'green',
                            }}
                          >
                            {trip.status.charAt(0) + trip.status.slice(1).toLowerCase()}
                          </p>
                        )}


                        <button className="btn btn-primary btn-sm mt-2"
                          onClick={() =>
                            trip?.tripId ? navigate(`/trip/${trip.tripId}`)
                              : console.warn('Trip ID is undefined')}
                        >
                          View Details</button>
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
