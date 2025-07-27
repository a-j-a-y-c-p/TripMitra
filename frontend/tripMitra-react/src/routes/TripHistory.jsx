import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const TripHistory = () => {
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Current date for filtering past trips
  const currentDate = new Date('2025-07-27');

  // Fetch trips from backend on component mount
  useEffect(() => {
    const fetchTrips = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://your-backend-url/api/trips');
        // Filter trips where endDate is before current date
        const pastTrips = response.data.filter(trip => 
          new Date(trip.itinerary.endDate) < currentDate
        );
        setTrips(pastTrips);
        setError(null);
      } catch (err) {
        setError('Failed to fetch trip history. Please try again.');
        console.error('Error fetching trips:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrips();
  }, []);

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

      {/* Trip History List */}
      <div className="row">
        <div className="col-12">
          {trips.length === 0 && !isLoading && (
            <p className="text-center">No past trips found.</p>
          )}
          {trips.length > 0 && (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Mode</th>
                    <th>Source</th>
                    <th>Destination</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Members</th>
                    <th>Cost (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {trips.map(trip => (
                    <tr key={trip.id}>
                      <td>{trip.tripInfo.mode}</td>
                      <td>{trip.itinerary.source}</td>
                      <td>{trip.itinerary.destination}</td>
                      <td>{trip.itinerary.startDate}</td>
                      <td>{trip.itinerary.endDate}</td>
                      <td>{trip.tripInfo.currMembers}/{trip.tripInfo.maxMembers}</td>
                      <td>{trip.tripInfo.estimatedCost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripHistory;