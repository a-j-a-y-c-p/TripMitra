import React, { useState } from 'react';
import api from '../api/axiosConfig';

const AddTripForm = () => {
  const [trip, setTrip] = useState({
    mode: '',
    currMembers: '',
    maxMembers: '1',
    estimateCost: '0',
    tripDetails: {
      source: '',
      destination: '',
      startDate: '',
      endDate: ''
    },
    description: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    memberLimit: false,
    dateOrder: false
  });

  const handleTripInfoChange = (e) => {
    const { name, value } = e.target;
    setTrip((prev) => ({
      ...prev,
      [name]: ['currMembers', 'maxMembers', 'estimateCost', 'description'].includes(name)
        ? value.replace(/\D/g, '') // Only numbers
        : value
    }));
  };

  const handleItineraryChange = (e) => {
    const { name, value } = e.target;
    setTrip((prev) => ({
      ...prev,
      tripDetails: {
        ...prev.tripDetails,
        [name]: value
      }
    }));
  };

  const validate = () => {
    const memberLimit = parseInt(trip.currMembers || 0) > parseInt(trip.maxMembers || 1);
    const dateOrder = new Date(trip.tripDetails.endDate) < new Date(trip.tripDetails.startDate);
    setErrors({ memberLimit, dateOrder });
    return !(memberLimit || dateOrder);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true); // Disable button

    try {
      const payload = {
        ...trip,
        currMembers: parseInt(trip.currMembers),
        maxMembers: parseInt(trip.maxMembers),
        estimateCost: parseInt(trip.estimateCost)
      };

      const response = await api.post('/trips/new', payload);
      console.log('Trip added successfully:', response.data);
      alert('Trip added successfully!');

      setTrip({
        mode: '',
        currMembers: '1',
        maxMembers: '1',
        estimateCost: '0',
        tripDetails: {
          source: '',
          destination: '',
          startDate: '',
          endDate: ''
        },
        description: ''
      });
      setErrors({ memberLimit: false, dateOrder: false });
    } catch (error) {
      console.error('Error adding trip:', error);
      alert('Failed to add trip. Please try again.');
    } finally {
      setSubmitting(false); // Re-enable button
    }
  };


  return (
    <div className="container mt-4 mt-md-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body p-3 p-md-4">
              <h2 className="card-title text-center mb-4 fs-4 fs-md-3">Add New Trip</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <h4 className="mb-3 fs-5">Trip Information</h4>
                  <div className="mb-3">
                    <label className="form-label">Travel Mode</label>
                    <select
                      name="mode"
                      value={trip.mode}
                      onChange={handleTripInfoChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select Mode</option>
                      <option value="Bike">Bike</option>
                      <option value="Car">Car</option>
                      <option value="Bus">Bus</option>
                      <option value="Train">Train</option>
                      <option value="Flight">Flight</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Current Members</label>
                    <input
                      type="text"
                      name="currMembers"
                      value={trip.currMembers}
                      onChange={handleTripInfoChange}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Maximum Members</label>
                    <input
                      type="text"
                      name="maxMembers"
                      value={trip.maxMembers}
                      onChange={handleTripInfoChange}
                      className="form-control"
                      required
                    />
                  </div>
                  {errors.memberLimit && (
                    <div className="alert alert-danger">
                      Current members cannot exceed maximum members.
                    </div>
                  )}

                  <div className="mb-3">
                    <label className="form-label">Estimated Cost (₹)</label>
                    <input
                      type="text"
                      name="estimateCost"
                      value={trip.estimateCost}
                      onChange={handleTripInfoChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="mb-3 fs-5">Itinerary</h4>
                  <div className="mb-3">
                    <label className="form-label">Source</label>
                    <input
                      type="text"
                      name="source"
                      value={trip.tripDetails.source}
                      onChange={handleItineraryChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Destination</label>
                    <input
                      type="text"
                      name="destination"
                      value={trip.tripDetails.destination}
                      onChange={handleItineraryChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={trip.tripDetails.startDate}
                      onChange={handleItineraryChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={trip.tripDetails.endDate}
                      onChange={handleItineraryChange}
                      className="form-control"
                      required
                    />
                  </div>
                  {errors.dateOrder && (
                    <div className="alert alert-danger">
                      End date must be after start date.
                    </div>
                  )}

                  <div className="mb-3">
                    <label className="form-label">Trip Description</label>
                    <textarea
                      name="description"
                      value={trip.description}
                      onChange={handleTripInfoChange}
                      className="form-control"
                      rows="3"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2"
                  disabled={submitting}
                >
                  {submitting ? 'Adding Trip...' : 'Add Trip'}
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTripForm;
