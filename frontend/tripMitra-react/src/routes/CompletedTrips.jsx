import React, { useState, useEffect, useContext } from 'react';
import api from '../api/axiosConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../contexts/AuthContext';

const CompletedTrips = () => {
    const [trips, setTrips] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);

    const userId = user?.userId;

    useEffect(() => {
        const fetchTrips = async () => {

            setIsLoading(true);
            try {
                const response = await api.get(`/trips/completed`);
                setTrips(response.data);

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
            <h1 className="text-center mb-4 fs-3 fs-md-2">Cancelled Trips</h1>
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
                        <p className="text-center">No cancelled trips found.</p>
                    )}
                    {trips.length > 0 && (
                        <>
                            {trips.map(trip => (
                                <div key={trip.id} className="mb-4">
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

export default CompletedTrips;