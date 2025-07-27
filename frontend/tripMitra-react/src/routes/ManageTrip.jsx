import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ManageTrip = () => {
  const [trips, setTrips] = useState([]);
  const [editingTrip, setEditingTrip] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch trips from backend on component mount
  useEffect(() => {
    const fetchTrips = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:8910/trips/');
        setTrips(response.data);
        console.log('Fetched trips:', response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch trips. Please try again.');
        console.error('Error fetching trips:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrips();
  }, []);

  // Handle edit button click
  const handleEdit = (trip) => {
    setEditingTrip(trip);
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this trip?')) return;
    setIsLoading(true);
    try {
      await axios.delete(`http://localhost:8910/trips/delete/${id}`);
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

  // Handle form input changes for tripInfo
  const handleTripInfoChange = (e) => {
    const { name, value } = e.target;
    setEditingTrip(prev => ({
      ...prev,
      tripInfo: {
        ...prev.tripInfo,
        [name]: name === 'currMembers' || name === 'maxMembers' || name === 'estimatedCost' 
          ? parseInt(value) || 0 
          : value
      }
    }));
  };

  // Handle form input changes for itinerary
  const handleItineraryChange = (e) => {
    const { name, value } = e.target;
    setEditingTrip(prev => ({
      ...prev,
      itinerary: {
        ...prev.itinerary,
        [name]: value
      }
    }));
  };

  // Handle form submission for editing
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingTrip.tripInfo.currMembers > editingTrip.tripInfo.maxMembers) {
      alert('Current members cannot exceed maximum members.');
      return;
    }
    if (editingTrip.itinerary.startDate && editingTrip.itinerary.endDate) {
      if (new Date(editingTrip.itinerary.startDate) > new Date(editingTrip.itinerary.endDate)) {
        alert('End date must be after start date.');
        return;
      }
    }
    setIsLoading(true);
    try {
      const response = await axios.put(`http://localhost:8910/trips/${editingTrip.id}`, editingTrip);
      setTrips(trips.map(trip => (trip.id === editingTrip.id ? response.data : trip)));
      setEditingTrip(null);
      setError(null);
      alert('Trip updated successfully!');
    } catch (err) {
      setError('Failed to update trip. Please try again.');
      console.error('Error updating trip:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingTrip(null);
  };

  return (
    <div className="container mt-4 mt-md-5">
      <h1 className="text-center mb-4 fs-3 fs-md-2">Manage Trips</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {isLoading && <div className="text-center"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>}

      {/* Trip List */}
      {!editingTrip && (
        <div className="row">
          <div className="col-12">
            {trips.length === 0 && !isLoading && <p className="text-center">No trips available.</p>}
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
                      <th>Actions</th>
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
                        <td>
                          <button
                            className="btn btn-sm btn-primary me-2"
                            onClick={() => handleEdit(trip)}
                            disabled={isLoading}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(trip.id)}
                            disabled={isLoading}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Edit Form */}
      {editingTrip && (
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card shadow-sm">
              <div className="card-body p-3 p-md-4">
                <h2 className="card-title text-center mb-4 fs-4 fs-md-3">Edit Trip</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <h4 className="mb-3 fs-5">Trip Information</h4>
                    <div className="mb-3">
                      <label htmlFor="mode" className="form-label">Travel Mode</label>
                      <select
                        id="mode"
                        name="mode"
                        value={editingTrip.tripInfo.mode}
                        onChange={handleTripInfoChange}
                        className="form-select"
                        required
                      >
                        <option value="">Select Mode</option>
                        <option value="Car">Car</option>
                        <option value="Bus">Bus</option>
                        <option value="Train">Train</option>
                        <option value="Flight">Flight</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="currMembers" className="form-label">Current Members</label>
                      <input
                        type="number"
                        id="currMembers"
                        name="currMembers"
                        value={editingTrip.tripInfo.currMembers}
                        onChange={handleTripInfoChange}
                        min="1"
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="maxMembers" className="form-label">Maximum Members</label>
                      <input
                        type="number"
                        id="maxMembers"
                        name="maxMembers"
                        value={editingTrip.tripInfo.maxMembers}
                        onChange={handleTripInfoChange}
                        min="1"
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="estimatedCost" className="form-label">Estimated Cost (₹)</label>
                      <input
                        type="number"
                        id="estimatedCost"
                        name="estimatedCost"
                        value={editingTrip.tripInfo.estimatedCost}
                        onChange={handleTripInfoChange}
                        min="0"
                        className="form-control"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="mb-3 fs-5">Itinerary</h4>
                    <div className="mb-3">
                      <label htmlFor="source" className="form-label">Source</label>
                      <input
                        type="text"
                        id="source"
                        name="source"
                        value={editingTrip.itinerary.source}
                        onChange={handleItineraryChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="destination" className="form-label">Destination</label>
                      <input
                        type="text"
                        id="destination"
                        name="destination"
                        value={editingTrip.itinerary.destination}
                        onChange={handleItineraryChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="startDate" className="form-label">Start Date</label>
                      <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={editingTrip.itinerary.startDate}
                        onChange={handleItineraryChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="endDate" className="form-label">End Date</label>
                      <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={editingTrip.itinerary.endDate}
                        onChange={handleItineraryChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      type="submit"
                      className="btn btn-primary w-50 py-2"
                      disabled={isLoading || editingTrip.tripInfo.currMembers > editingTrip.tripInfo.maxMembers}
                    >
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary w-50 py-2"
                      onClick={handleCancel}
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTrip;