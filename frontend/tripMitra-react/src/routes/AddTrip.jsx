import React, { useState, useEffect, useContext } from 'react';
import api from '../api/axiosConfig';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../contexts/AuthContext';

const AddTripForm = () => {
  const { token } = useContext(AuthContext);

  const [trip, setTrip] = useState({
    mode: '',
    currMembers: '',
    maxMembers: '',
    estimateCost: '',
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
  useEffect(() => {
    const checkErrors = () => {
      const currMembers = parseInt(trip.currMembers || 0);
      const maxMembers = parseInt(trip.maxMembers || 0);
      const estimateCost = parseInt(trip.estimateCost || 0);
      const startDate = new Date(trip.tripDetails.startDate);
      const endDate = new Date(trip.tripDetails.endDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const newErrors = {
        memberLimit: currMembers > maxMembers,
        dateOrder: endDate < startDate,
        startDatePast: startDate < today,
        estCostInvalid: estimateCost < 100,
        maxMemberInvalid: maxMembers < 1,
        currMemberInvalid: currMembers < 1,
        modeEmpty: trip.mode.trim() === '',
        shortDescription: trip.description.trim().length < 10,
        sameLocation:
          trip.tripDetails.source.trim().toLowerCase() ===
          trip.tripDetails.destination.trim().toLowerCase()
      };

      setErrors(newErrors);
    };

    checkErrors();
  }, [trip]);

  const handleTripInfoChange = (e) => {
    const { name, value } = e.target;
    setTrip((prev) => ({
      ...prev,
      [name]: ['currMembers', 'maxMembers', 'estimateCost'].includes(name)
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
  const [showErrors, setShowErrors] = useState(false);
  const validate = async () => {
    const currMembers = parseInt(trip.currMembers || 0);
    const maxMembers = parseInt(trip.maxMembers || 0);
    const estimateCost = parseInt(trip.estimateCost || 0);
    const startDate = new Date(trip.tripDetails.startDate);
    const endDate = new Date(trip.tripDetails.endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Step 1: Try to get user details from backend
    let userProfileMissing = false;
    try {
      const userDetailsResponse = await api.get("userdetails/userdetailsGet", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("User details:", userDetailsResponse.data);
      if (
        !userDetailsResponse.data ||
        Object.keys(userDetailsResponse.data).length === 0
      ) {
        userProfileMissing = true;
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
      userProfileMissing = true;
    }

    if (userProfileMissing) {
      toast.info("Please update your profile before adding a trip.");
    }


    // Step 2: Form validation
    const errorsToSet = {
      memberLimit: currMembers > maxMembers,
      dateOrder: endDate < startDate,
      startDatePast: startDate < today,
      estCostInvalid: estimateCost < 100,
      maxMemberInvalid: maxMembers < 1,
      currMemberInvalid: currMembers < 1,
      modeEmpty: trip.mode.trim() === "",
      shortDescription: trip.description.trim().length < 10,
      sameLocation:
        trip.tripDetails.source.trim().toLowerCase() ===
        trip.tripDetails.destination.trim().toLowerCase(),
    };

    setErrors(errorsToSet);

    const hasAnyValidationError = Object.values(errorsToSet).some(Boolean);

    return !(userProfileMissing || hasAnyValidationError);
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowErrors(true);
    const isValid = await validate();

    if (!isValid) return;

    setSubmitting(true);
    try {
      const payload = {
        ...trip,
        currMembers: parseInt(trip.currMembers),
        maxMembers: parseInt(trip.maxMembers),
        estimateCost: parseInt(trip.estimateCost)
      };

      const response = await api.post('/trips/new', payload);
      toast.done('Trip added successfully!');
      console.log('Trip added successfully:', response.data);

      // Reset form
      setTrip({
        mode: '',
        currMembers: '',
        maxMembers: '',
        estimateCost: '',
        tripDetails: {
          source: '',
          destination: '',
          startDate: '',
          endDate: ''
        },
        description: ''
      });
      setErrors({ memberLimit: false, dateOrder: false });
      setShowErrors(false);
    } catch (error) {
      console.error('Error adding trip:', error);
      toast.error('Failed to add trip. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const hasErrors = Object.values(errors).some(Boolean);


  return (

    <div className="container mt-4 mt-md-5">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        closeOnClick
        pauseOnHover
        draggable
        closeButton={true}
      />

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
                  {showErrors && errors.modeEmpty && (
                    <div className="alert alert-danger">Please select a travel mode.</div>
                  )}
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
                  {showErrors && errors.currMemberInvalid && (
                    <div className="alert alert-danger">There must be at least one current member.</div>
                  )}
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
                  {showErrors && errors.memberLimit && (
                    <div className="alert alert-danger">
                      Current members cannot exceed maximum members.
                    </div>
                  )}
                  {showErrors && errors.maxMemberInvalid && (
                    <div className="alert alert-danger">
                      Maximum members must be greater than 0.
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
                    {showErrors && errors.estCostInvalid && (
                      <div className="alert alert-danger">
                        Estimated cost must be greater than 99.
                      </div>
                    )}
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
                  {showErrors && errors.sameLocation && (
                    <div className="alert alert-danger">Source and destination cannot be the same.</div>
                  )}
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
                  {showErrors && errors.startDatePast && (
                    <div className="alert alert-danger">Start date cannot be in the past.</div>
                  )}
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
                  {showErrors && errors.dateOrder && (
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
                    {showErrors && errors.shortDescription && (
                      <div className="alert alert-danger">Description must be at least 10 characters.</div>
                    )}
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
