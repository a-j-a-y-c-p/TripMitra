import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/TripMembers.css';

const TripMembers = () => {
  const [members, setMembers] = useState([]);
  const { tripId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await api.get(`/members/requests/${tripId}`);
        setMembers(response.data);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, [tripId]);

  const handleAccept = async (userId) => {
    try {
      await api.put('/members/update', {
        memberId: { userId, tripId },
        status: 'ACCEPTED',
      });
      setMembers(prev => prev.filter(m => m.user.userId !== userId));
    } catch (error) {
      console.error('Error accepting member:', error);
    }
  };

  const handleReject = async (userId) => {
    try {
      await api.put('/members/update', {
        memberId: { userId, tripId },
        status: 'REJECTED',
      });
      setMembers(prev => prev.filter(m => m.user.userId !== userId));
    } catch (error) {
      console.error('Error rejecting member:', error);
    }
  };

  const handleView = (userId) => {
    navigate(`/profile/${userId}`); // Navigate to member's profile page
  };

  return (
    <div className="trip-container">
      <h2 className="trip-title">Trip Member Requests</h2>

      {members.length === 0 ? (
        <p>No member requests.</p>
      ) : (
        members.map((member) => (
          <div key={member.user.userId} className="member-card">
            <div className="profile-section">
              <div className="profile-pic" />
            </div>

            <div className="info-section">
              <div className="member-name">{member.user.userName}</div>
              <div className="member-gender">{member.user.gender}</div>
            </div>

            <div className="button-group inline-buttons">
              <button className="btn accept-btn" onClick={() => handleAccept(member.user.userId)}>Accept</button>
              <button className="btn delete-btn" onClick={() => handleReject(member.user.userId)}>Reject</button>
              <button className="btn edit-btn" onClick={() => handleView(member.user.userId)}>View</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TripMembers;
