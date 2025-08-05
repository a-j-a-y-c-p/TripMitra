import React, { useEffect, useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import axiosInstance from '../api/axiosConfig';

const TripList = ({ filters }) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5; // You can customize this

  const fetchTrips = useCallback(
    debounce(async (filters, page) => {
      try {
        setLoading(true);
        const params = {
          page,
          size: pageSize
        };

        if (filters.source) params.source = filters.source;
        if (filters.destination) params.destination = filters.destination;
        if (filters.minPrice != null) params.minPrice = filters.minPrice;
        if (filters.maxPrice != null) params.maxPrice = filters.maxPrice;
        if (filters.minSeats != null) params.minSeats = filters.minSeats;
        if (filters.maxSeats != null) params.maxSeats = filters.maxSeats;

        const response = await axiosInstance.get('/trips/filter', { params });

        setTrips(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        console.error(err);
        setError('Failed to load trips.');
      } finally {
        setLoading(false);
      }
    }, 400),
    []
  );

  useEffect(() => {
    setPage(0); // Reset to first page when filters change
  }, [filters]);

  useEffect(() => {
    fetchTrips(filters, page);
  }, [filters, page, fetchTrips]);

  const handlePrevious = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

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
              <p className="mb-1"><strong>Members:</strong> {trip.currMembers}/{trip.maxMembers}</p>
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

      {/* Pagination Controls */}
      <div className="d-flex justify-content-center my-4">
        <button
          className="btn btn-outline-primary me-2"
          onClick={handlePrevious}
          disabled={page === 0}
        >
          Previous
        </button>
        <span className="align-self-center">Page {page + 1} of {totalPages}</span>
        <button
          className="btn btn-outline-primary ms-2"
          onClick={handleNext}
          disabled={page >= totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TripList;


