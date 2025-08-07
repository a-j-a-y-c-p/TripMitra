import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../api/axiosConfig';
import { AuthContext } from '../contexts/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from '../components/Navigation';

const AdminManageTrip = () => {
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  const userId = user?.userId;

  useEffect(() => {
    const fetchTrips = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/trips/`);
        if (!Array.isArray(response.data)) {
          throw new Error('Expected an array of trip IDs');
        }


        setTrips(response.data);
        setError(null);
      } catch (err) {
        setError('No trips found !');
        console.error('Error fetching trips:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrips();
  }, [userId]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this trip?')) return;
    setIsLoading(true);
    try {
      await api.post(`/trips/delete/${id}`);
      setTrips(trips.filter((trip) => trip.tripId !== id));
      setError(null);
      toast.error('Trip deleted successfully!');
    } catch (err) {
      setError('Failed to delete trip. Please try again.');
      console.error('Error deleting trip:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (


    <div className="container-fluid bg-light py-3">
      <div className="row g-3">
        <div className="col-sm-12 col-md-3 ">
          <Navigation />
        </div>
        <div className="col-sm-12 col-md-9 px-0 ">
          <div className="container mt-4 mt-md-5">
            <ToastContainer
              position="top-center"
              autoClose={3000}
              closeOnClick
              pauseOnHover
              draggable
              closeButton={true}
            />
            <h1 className="text-center mb-4 fs-3 fs-md-2">Manage Trips</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            {isLoading && (
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}

            <div className="row justify-content-center g-2">
              <div className="col-12 col-md-8">
                {trips.length === 0 && !isLoading && (
                  <p className="text-center">No trips available.</p>
                )}
                {trips.length > 0 && (
                  <>
                    {trips.map((trip) => (
                      <div key={trip.tripId} className="mb-4">
                        <div className="card shadow-sm border-0" style={{ borderRadius: '8px' }}>
                          <div className="card-body d-flex justify-content-between align-items-center">
                            <div>
                              <h5 className="fw-bold mb-1" style={{ fontSize: '1.25rem' }}>
                                {trip.tripDetails?.source || 'N/A'} → {trip.tripDetails?.destination || 'N/A'}
                              </h5>
                              <p className="mb-1 text-muted" style={{ fontSize: '0.9rem' }}>
                                {trip.tripDetails?.startDate || 'N/A'} – {trip.tripDetails?.endDate || 'N/A'}
                              </p>
                            </div>

                            <div className="text-center">
                              <p className="mb-1">
                                <strong>Mode:</strong> {trip.mode || 'N/A'}
                              </p>
                              <p className="mb-1">
                                <strong>Members:</strong> {trip.currMembers}/{trip.maxMembers}
                              </p>
                            </div>

                            <div className="text-end d-flex flex-column align-items-end">
                              <p className="mb-2 fw-bold me-2" style={{ fontSize: '1.25rem' }}>
                                ₹{trip.estimateCost}
                              </p>

                              <button
                                className="btn btn-danger btn-sm me-0"
                                onClick={() => handleDelete(trip.tripId)}
                                disabled={isLoading}
                              >
                                Delete
                              </button>

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
        </div>
      </div>
    </div>



  );
};

export default AdminManageTrip;
