import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../api/axiosConfig';
import { jwtDecode } from 'jwt-decode';

const ManageTrip = () => {
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
    const token = localStorage.get('token');
     try {
      const decoded = jwtDecode(token);
    } catch (error) {
      console.error('Error decoding JWT:', error.message);
    }
  
    const userId = decoded.sub;
  // Fetch trips from backend on component mount
  useEffect(() => {
    const fetchTrips = async () => {
      setIsLoading(true);
      try {

        // Step 1: Fetch list of trip IDs for the user
        const response = await api.get(`/members/${userId}`);
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

  // Handle delete button click
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this trip?')) return;
    setIsLoading(true);
    try {
      await api.delete(`/trips/delete/${id}`, {
        auth: { username, password }
      });
      setTrips(trips.filter(trip => trip.id !== id));
      setError(null);
      alert('Trip deleted successfully!');
    } catch (err) {
      setError('Failed to delete trip. Please try again.');
      console.error('Error deleting trip:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle edit button click
  const handleEdit = (tripId) => {
    navigate(`/edit-trip/${tripId}`);
  };

  return (
    <div className="container mt-4 mt-md-5">
      <h1 className="text-center mb-4 fs-3 fs-md-2">Manage Trips</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {isLoading && (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {/* Trip Cards */}
      <div className="row justify-content-center g-2">
        <div className="col-12 col-md-8">
          {trips.length === 0 && !isLoading && (
            <p className="text-center">No trips available.</p>
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
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => handleEdit(trip.id)}
                            disabled={isLoading}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(trip.id)}
                            disabled={isLoading}
                          >
                            Delete
                          </button>
                        </div>
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

export default ManageTrip;