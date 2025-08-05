import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axiosConfig';
import '../css/TripDetails.css';
import { AuthContext } from '../contexts/AuthContext.jsx';
const TripDetails = () => {
    
    const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [joinedUsers, setJoinedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [joining, setJoining] = useState(false);

  const userId = user?.id; 
        
  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const tripRes = await api.get(`/trips/${id}`);
        
        if (!tripRes) throw new Error("Trip not found");
        const trip = await tripRes.data;
        setTrip(trip);
        console.log("Trip Details:", trip);

    //   const usersRes = await api.get(`/members/`);
    //     const users = usersRes.data;
    //     setJoinedUsers(users);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTripDetails();
  }, [id]);

   const handleJoinTrip = async () => {
    try {
      setJoining(true);
      setSuccessMessage('');
      const response = await api.post('/members/add', {
        tripId: parseInt(id),
        userId: parseInt(userId)
      });

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage('Successfully joined the trip!');
        // Optionally update UI
        setJoinedUsers([...joinedUsers, `User ${userId}`]); // temp name
      } else {
        throw new Error('Failed to join trip');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setJoining(false);
    }
  };

  if (loading) return <p>Loading trip details...</p>;
  if (error || !trip) return <h2 className="not-found">{error || "Trip not found"}</h2>;

  return (
    <div className="trip-details-container">
      {/* LEFT: Trip Details */}
      <div className="trip-main">
        <div className="trip-header">
          <h1>{trip.tripDetails.source} → {trip.tripDetails.destination}</h1>
          <p className="travel-mode">{trip.mode} Travel | ₹{trip.estimateCost}</p>
        </div>

        <div className="trip-meta">
          <div className="meta-item">
            <span className="label">Current Members:</span>
            <span className="value">{joinedUsers.length}</span>
          </div>
          <div className="meta-item">
            <span className="label">Max Members:</span>
            <span className="value">{trip.maxMembers}</span>
          </div>
          <div className="meta-item">
            <span className="label">Start Date:</span>
            <span className="value">{trip.tripDetails.startDate}</span>
          </div>
          <div className="meta-item">
            <span className="label">End Date:</span>
            <span className="value">{trip.tripDetails.endDate}</span>
          </div>
        </div>

        <div className="trip-description">
          <h2>Trip Overview</h2>
          <p>
            Embark on an unforgettable journey from <strong>{trip.tripDetails.source}</strong> to <strong>{trip.tripDetails.destination}</strong> via <strong>{trip.mode}</strong>. 
            This trip spans from <strong>{trip.tripDetails.startDate}</strong> to <strong>{trip.tripDetails.endDate}</strong> and is budgeted at <strong>₹{trip.estimateCost}</strong>. 
            Currently, <strong>{joinedUsers.length}</strong> out of <strong>{trip.tripDetails.maxMembers}</strong> members have joined.
          </p>
        </div>

        <div className="join-trip-container">
          <button className="join-trip-button" onClick={handleJoinTrip} disabled={joining}>
            {joining ? 'Joining...' : 'Join Trip'}
          </button>
          {successMessage && <p className="success-msg">{successMessage}</p>}
        </div>
      </div>

      {/* RIGHT: Joined Users */}
      <div className="trip-sidebar">
        <div className="joined-users-box">
          <h3>Joined Members</h3>
          {joinedUsers.length === 0 ? (
            <p>No one has joined yet.</p>
          ) : (
            <ul>
              {joinedUsers.map((username, index) => (
                <li key={index}>{username}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripDetails;