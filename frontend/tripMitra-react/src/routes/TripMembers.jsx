import React from 'react';
import '../CSS/TripMembers.css';

const members = [
  { id: 1, name: 'John Doe', gender: 'Male' },
  { id: 2, name: 'Priya Sharma', gender: 'Female' },
  { id: 3, name: 'Amit Patel', gender: 'Male' },
  { id: 4, name: 'Neha Verma', gender: 'Female' },
];

const TripMembers = () => {
  return (
    <div className="trip-container">
      <h2 className="trip-title">Trip Members</h2>

      {members.map((member) => (
        <div key={member.id} className="member-card">
          <div className="profile-section">
            <div className="profile-pic" />
          </div>

          <div className="info-section">
            <div className="member-name">{member.name}</div>
            <div className="member-gender">{member.gender}</div>
          </div>

          <div className="button-group right-side">
            <button className="btn accept-btn">Accept</button>
            <button className="btn delete-btn">Delete</button>
            <button className="btn edit-btn">Edit</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TripMembers;



// code for api


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../CSS/TripMembers.css';

// const TripMembers = () => {
//   const [members, setMembers] = useState([]);

//   useEffect(() => {
//     const fetchMembers = async () => {
//       try {
//         const response = await axios.get('https://your-api-url.com/api/members');
//         setMembers(response.data); 
//       } catch (error) {
//         console.error('Error fetching members:', error);
//       }
//     };

//     fetchMembers();
//   }, []);

//   return (
//     <div className="trip-container">
//       <h2 className="trip-title">Trip Members</h2>

//       {members.map((member) => (
//         <div key={member.id} className="member-card">
//           <div className="profile-section">
//             <div className="profile-pic" />
//           </div>

//           <div className="info-section">
//             <div className="member-name">{member.name}</div>
//             <div className="member-gender">{member.gender}</div>
//           </div>

//           <div className="button-group inline-buttons">
//             <button className="btn accept-btn">Accept</button>
//             <button className="btn delete-btn">Delete</button>
//             <button className="btn edit-btn">Edit</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TripMembers;

