import React from 'react';
import { useParams } from 'react-router-dom';
import '../css/TripDetails.css'; // ensure this file exists

const TripDetails = () => {
  const { id } = useParams(); // e.g. /trip/1

  // Sample hardcoded data (replace or extend for more trips)
  const tripData = {
    "1": {
      travelMode: "Bus",
      currentMembers: 1,
      maxMembers: 5,
      estimatedCost: 12000,
      source: "Delhi",
      destination: "Manali",
      startDate: "2025-08-10",
      endDate: "2025-08-15",
    },
    "2": {
      travelMode: "Flight",
      currentMembers: 2,
      maxMembers: 4,
      estimatedCost: 20000,
      source: "Mumbai",
      destination: "Goa",
      startDate: "2025-09-01",
      endDate: "2025-09-05",
    },
  };

  const trip = tripData[id];

  if (!trip) return <h2>Trip not found</h2>;

  return (
    <div className="trip-details-container">
      <h2>Trip Details</h2>
      <div className="trip-card">
        <p><strong>Travel Mode:</strong> {trip.travelMode}</p>
        <p><strong>Current Members:</strong> {trip.currentMembers}</p>
        <p><strong>Maximum Members:</strong> {trip.maxMembers}</p>
        <p><strong>Estimated Cost:</strong> ₹{trip.estimatedCost}</p>
        <p><strong>Source:</strong> {trip.source}</p>
        <p><strong>Destination:</strong> {trip.destination}</p>
        <p><strong>Start Date:</strong> {trip.startDate}</p>
        <p><strong>End Date:</strong> {trip.endDate}</p>
      </div>
    </div>
  );
};

export default TripDetails;