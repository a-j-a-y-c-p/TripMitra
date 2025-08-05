import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

const EditTripForm = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState({
    mode: '',
    currMembers: '',
    maxMembers: '',
    estimatedCost: '',
    tripDetails: {
      source: '',
      destination: '',
      startDate: '',
      endDate: ''
    },
    description: ''
  });

  // Fetch trip details on mount
  useEffect(() => {
    api.get(`/trips/${tripId}`)
      .then(response => {
        setTrip(response.data);
      })
      .catch(error => {
        console.error('Error fetching trip:', error);
      });
  }, [tripId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["source", "destination", "startDate", "endDate"].includes(name)) {
      setTrip(prev => ({
        ...prev,
        tripDetails: {
          ...prev.tripDetails,
          [name]: value
        }
      }));
    } else {
      setTrip(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.put(`/trips/${tripId}`, trip)
      .then(() => {
        alert('Trip updated successfully!');
        navigate('/trips');
      })
      .catch(error => {
        alert('Failed to update trip.');
        console.error(error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h2 className="text-center mb-4">Edit Trip</h2>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Source</label>
              <input type="text" name="source" className="form-control" value={trip.tripDetails.source} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Destination</label>
              <input type="text" name="destination" className="form-control" value={trip.tripDetails.destination} onChange={handleChange} />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Start Date</label>
              <input type="date" name="startDate" className="form-control" value={trip.tripDetails.startDate} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label">End Date</label>
              <input type="date" name="endDate" className="form-control" value={trip.tripDetails.endDate} onChange={handleChange} />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Mode of Travel</label>
            <select className="form-select" name="mode" value={trip.mode} onChange={handleChange}>
              <option value="">Select mode</option>
              <option value="Train">Train</option>
              <option value="Bus">Bus</option>
              <option value="Car">Car</option>
              <option value="Flight">Flight</option>
            </select>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Current Members</label>
              <input type="number" name="currMembers" className="form-control" value={trip.currMembers} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Max Members</label>
              <input type="number" name="maxMembers" className="form-control" value={trip.maxMembers} onChange={handleChange} />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Estimated Cost (₹)</label>
            <input type="number" name="estimatedCost" className="form-control" value={trip.estimatedCost} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Trip Description</label>
            <textarea name="description" className="form-control" rows="3" value={trip.description} onChange={handleChange} />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary px-4">Update Trip</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTripForm;
