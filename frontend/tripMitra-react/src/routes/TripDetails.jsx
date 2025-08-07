import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import '../css/TripDetails.css';
import { AuthContext } from '../contexts/AuthContext.jsx';

const TripDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
  const [joinedUsers, setJoinedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [alreadyJoined, setAlreadyJoined] = useState(false); 
  const [withdrawing, setWithdrawing] = useState(false);
  const [withdrawRequested, setWithdrawRequested] = useState(false);

  const userId = user?.userId;

  useEffect(() => {
  const fetchTripDetails = async () => {
    try {
      const tripRes = await api.get(`/trips/${id}`);
      const tripData = tripRes.data;
      setTrip(tripData);

      const usersRes = await api.get(`/members/users/${id}`);
      setJoinedUsers(usersRes.data);

   
      const existsRes = await api.post('/members/exists', {
  userId: userId,
  tripId: id
});

if (existsRes.data === 'pending') {
  setWithdrawRequested(true);
  setAlreadyJoined(true); 
} else if (existsRes.data === true) {
  setAlreadyJoined(true);
  setWithdrawRequested(false);
} else {
  setAlreadyJoined(false);
  setWithdrawRequested(false);
}
      setAlreadyJoined(existsRes.data === true);
    } catch (err) {
      console.error(err);
      setError('Failed to load trip details.');
    } finally {
      setLoading(false);
    }
  };

  if (userId) {
    fetchTripDetails();
  }
}, [id, userId]);

  const tripFull = trip && trip.currMembers >= trip.maxMembers;



  const handleJoinTrip = async () => {
  if (alreadyJoined) {
    setError('You are already a participant in this trip.');
    return;
  }

  if (tripFull) {
    setError('This trip is already full.');
    return;
  }

  setJoining(true);
  setError('');
  setSuccessMessage('');

  try {
    const token = localStorage.getItem('token');

    const userDetailsResponse = await api.get('/userdetails/userdetailsGet', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const details = userDetailsResponse.data;

    // 👇 Check if userDetails exist or are valid
    if (!details || !details.user || !details.user.userId) {
      setError('Please update your profile before joining a trip.');
      setJoining(false);
      return;
    }

    // Proceed with joining the trip
    const response = await api.post('/members/add', {
      userId: parseInt(userId),
      tripId: parseInt(id),
    });

    if (response.status === 200 || response.status === 201) {
      setSuccessMessage('Successfully joined the trip!');
      setJoinedUsers(prev => [...prev, { userId, username: user.username }]);
      setTrip(prev => ({
        ...prev,
        currMembers: prev.currMembers + 1,
      }));
      setAlreadyJoined(true);
    } else {
      throw new Error('Failed to join the trip.');
    }
  } catch (err) {
    console.error('Join error:', err);

    // ✅ Handle backend "Details not found" response
    if (err.response?.data?.message?.includes('Details not found')) {
      setError('Please update your profile before joining a trip.');
    } else {
      setError(err.response?.data?.message || err.message);
    }
  } finally {
    setJoining(false);
  }
};

  const handleLeaveTrip = async () => {
  if (!userId) {
    setError('You must be logged in to leave the trip.');
    return;
  }

  setJoining(true);
  setWithdrawing(true); 
  setError('');
  setSuccessMessage('');

  try {
    const response = await api.put('/members/leave', {
      userId: parseInt(userId),
      tripId: parseInt(id),
    });

    if (response.status === 200) {
  setSuccessMessage('Withdraw trip request sent.');
  setWithdrawRequested(true);
}
      else {
      throw new Error('Failed to leave the trip.');
    }
  } catch (err) {
    setError(err.response?.data?.message || err.message);
  } finally {
    setJoining(false);
    
  }
};

  if (loading) return <p>Loading trip details...</p>;
  if (!trip) return <h2 className="error-msg">Trip not found.</h2>;

  return (
    <div className="trip-details-container">
      <div className="trip-main">
        <button
          className="back-button"
          onClick={() => navigate(-1)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1.2rem',
            color: '#007bff',
            cursor: 'pointer',
            marginBottom: '1rem',
          }}
        >
          ← Back
        </button>

        <div className="trip-header">
          <h1>{trip.tripDetails.source} → {trip.tripDetails.destination}</h1>
          <p className="travel-mode">{trip.mode} Travel | ₹{trip.estimateCost}</p>
        </div>

        <div className="trip-meta">
          <div className="meta-item"><span className="label">Current Members:</span><span className="value">{trip.currMembers}</span></div>
          <div className="meta-item"><span className="label">Max Members:</span><span className="value">{trip.maxMembers}</span></div>
          <div className="meta-item"><span className="label">Start Date:</span><span className="value">{trip.tripDetails.startDate}</span></div>
          <div className="meta-item"><span className="label">End Date:</span><span className="value">{trip.tripDetails.endDate}</span></div>
        </div>

        <div className="trip-description">
          <h2>Trip Overview</h2>
          <p>
            Join the journey from <strong>{trip.tripDetails.source}</strong> to <strong>{trip.tripDetails.destination}</strong> via <strong>{trip.mode}</strong>.
            The trip runs from <strong>{trip.tripDetails.startDate}</strong> to <strong>{trip.tripDetails.endDate}</strong> with a cost of <strong>₹{trip.estimateCost}</strong>.
            Currently, <strong>{trip.currMembers}</strong> out of <strong>{trip.maxMembers}</strong> members have joined.
          </p>
        </div>

        <div className="join-trip-container">
 {alreadyJoined ? (
  withdrawRequested ? (
    <button
      className="join-trip-button pending"
      disabled
    >
      Withdraw Trip Requested
    </button>
  ) : (
    <button
      className="join-trip-button leave"
      onClick={handleLeaveTrip}
      disabled={joining}
    >
      {joining ? 'Leaving...' : 'Leave Trip'}
    </button>
  )
) : (
  <button
    className="join-trip-button"
    onClick={handleJoinTrip}
    disabled={joining || tripFull}
  >
    {joining ? 'Joining...' : tripFull ? 'Trip Full' : 'Join Trip'}
  </button>
)}
  {successMessage && <p className="success-msg">{successMessage}</p>}
  {error && <p className="error-msg">{error}</p>}
</div>
      </div>

      <div className="trip-sidebar">
        <div className="joined-users-box">
          <h3>Joined Members</h3>
          {joinedUsers.length === 0 ? (
            <p>No one has joined yet.</p>
          ) : (
            <ul>
  {joinedUsers.map((u, idx) => (
    <li key={idx} className="member-item">
      <img
        src={u.imageUrl}
        alt={u.user?.userName}
        className="member-image"
      />
      <div className="member-info">
        <p><strong>{u.user?.userName}</strong></p>
        <p>{u.user?.userEmail}</p>
        <p>{u.gender}</p>
      </div>
    </li>
  ))}
</ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripDetails;