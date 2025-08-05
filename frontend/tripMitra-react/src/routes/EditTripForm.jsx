import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

const EditTripForm = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState({
    mode: '',
    currMembers: 1,
    maxMembers: 1,
    estimateCost: 0,
    tripDetails: {
      source: '',
      destination: '',
      startDate: '',
      endDate: '',
    },
    description: ''
  });

  // Fetch trip data
  useEffect(() => {
    api.get(`/trips/${tripId}`)
      .then(response => setTrip(response.data))
      .catch(error => console.error('Failed to fetch trip:', error));
  }, [tripId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (['source', 'destination', 'startDate', 'endDate'].includes(name)) {
      setTrip(prev => ({
        ...prev,
        tripDetails: { ...prev.tripDetails, [name]: value },
      }));
    } else {
      setTrip(prev => ({ ...prev, [name]: value }));
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
        console.error('Update failed:', error);
        alert('Error updating trip');
      });
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4 fs-3 fs-md-2">Edit Trip</h3>
      <form onSubmit={handleSubmit} className="border p-4 rounded bg-light">
        <div className="mb-3">
          <label className="form-label">Mode of Travel</label>
          <input type="text" className="form-control" name="mode" value={trip.mode} onChange={handleChange} required />
        </div>
        <div className="row">
          <div className="mb-3 col-md-6">
            <label className="form-label">Current Members</label>
            <input type="number" className="form-control" name="currMembers" value={trip.currMembers} onChange={handleChange} required />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Max Members</label>
            <input type="number" className="form-control" name="maxMembers" value={trip.maxMembers} onChange={handleChange} required />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Estimated Cost (INR)</label>
          <input type="number" className="form-control" name="estimateCost" value={trip.estimateCost} onChange={handleChange} required />
        </div>
        <div className="row">
          <div className="mb-3 col-md-6">
            <label className="form-label">Source</label>
            <input type="text" className="form-control" name="source" value={trip.tripDetails.source} onChange={handleChange} required />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Destination</label>
            <input type="text" className="form-control" name="destination" value={trip.tripDetails.destination} onChange={handleChange} required />
          </div>
        </div>
        <div className="row">
          <div className="mb-3 col-md-6">
            <label className="form-label">Start Date</label>
            <input type="date" className="form-control" name="startDate" value={trip.tripDetails.startDate} onChange={handleChange} required />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">End Date</label>
            <input type="date" className="form-control" name="endDate" value={trip.tripDetails.endDate} onChange={handleChange} required />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Trip Description</label>
          <textarea
            name="description"
            value={trip.description}
            onChange={handleChange}
            className="form-control"
            rows="3"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Update Trip</button>
      </form>
    </div>
  );
};

export default EditTripForm;
