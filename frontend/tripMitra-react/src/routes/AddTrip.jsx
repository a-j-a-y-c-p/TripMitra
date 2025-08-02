import React, { useState } from 'react';
import api from '../api/axiosConfig';


const AddTripForm = () => {
  const [tripDetails, setTripDetails] = useState({
    tripInfo: {
      mode: '',
      currMembers: 1,
      maxMembers: 1,
      estimatedCost: 0
    },
    itinerary: {
      source: '',
      destination: '',
      startDate: '',
      endDate: ''
    }
  });

  const handleTripInfoChange = (e) => {
    const { name, value } = e.target;
    setTripDetails(prev => ({
      ...prev,
      tripInfo: {
        ...prev.tripInfo,
        [name]: name === 'currMembers' || name === 'maxMembers' || name === 'estimatedCost' 
          ? parseInt(value) || 0 
          : value
      }
    }));
  };

  const handleItineraryChange = (e) => {
    const { name, value } = e.target;
    setTripDetails(prev => ({
      ...prev,
      itinerary: {
        ...prev.itinerary,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/trips/new', tripDetails);
      console.log('Trip added successfully:', response.data);
      alert('Trip added successfully!');
      setTripDetails({
        tripInfo: { mode: '', currMembers: 1, maxMembers: 1, estimatedCost: 0 },
        itinerary: { source: '', destination: '', startDate: '', endDate: '' }
      });
    } catch (error) {
      console.error('Error adding trip:', error);
      alert('Failed to add trip. Please try again.');
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
                    <label htmlFor="mode" className="form-label">Travel Mode</label>
                    <select
                      id="mode"
                      name="mode"
                      value={tripDetails.tripInfo.mode}
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
                      value={tripDetails.tripInfo.currMembers}
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
                      value={tripDetails.tripInfo.maxMembers}
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
                      value={tripDetails.tripInfo.estimatedCost}
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
                      value={tripDetails.itinerary.source}
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
                      value={tripDetails.itinerary.destination}
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
                      value={tripDetails.itinerary.startDate}
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
                      value={tripDetails.itinerary.endDate}
                      onChange={handleItineraryChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2"
                  disabled={tripDetails.tripInfo.currMembers > tripDetails.tripInfo.maxMembers}
                >
                  Add Trip
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