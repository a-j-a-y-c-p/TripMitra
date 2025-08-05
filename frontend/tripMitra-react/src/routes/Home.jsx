import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroCarousel from './HeroCarousel';
import '../CSS/Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <HeroCarousel />

      {/* Feature 1 */}
      <section className="promo-section d-flex align-items-center text-white px-4 py-5 bgc1">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2 className="fw-bold mb-3">🔍 Smart Search & Filter</h2>
              <p className="mb-4">
                Users can search for trips based on source, destination, travel date, and time. Filter by preferences like budget, mode of travel and gender preference.
              </p>
              <button className="btn btn-light text-primary fw-semibold px-4" onClick={() => navigate('/dashboard')}>Learn More</button>
            </div>
            <div className="col-md-6 text-center mt-4 mt-md-0">
              <img src="../../images/pic1.png" alt="Smart Search" className="img-fluid" style={{ maxHeight: '250px' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Feature 2 */}
      <section className="promo-section d-flex align-items-center text-black px-4 py-5 bgc2">
        <div className="container">
          <div className="row align-items-center flex-md-row-reverse">
            <div className="col-md-6">
              <h2 className="fw-bold mb-3">👤 User Profiles & Authentication</h2>
              <p className="mb-4">Secure login/signup for riders and passengers. Profile includes user ratings, travel history, and contact info.</p>
              <button className="btn btn-light text-primary fw-semibold px-4" onClick={() => navigate('/login')}>Learn More</button>
            </div>
            <div className="col-md-6 text-center mt-4 mt-md-0">
              <img src="../../images/pic2.png" alt="User Profiles" className="img-fluid" style={{ maxHeight: '250px' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Feature 3 */}
      <section className="promo-section d-flex align-items-center text-white px-4 py-5 bgc1">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2 className="fw-bold mb-3">🛣️ Post & Join Trips</h2>
              <p className="mb-4">Users can create/post a trip with travel details. Other users can join available trips by sending a request or booking directly.</p>
              <button className="btn btn-light text-primary fw-semibold px-4" onClick={() => navigate('/addtrip')}>Learn More</button>
            </div>
            <div className="col-md-6 text-center mt-4 mt-md-0">
              <img src="../../images/pic3.png" alt="Post & Join Trips" className="img-fluid" style={{ maxHeight: '250px' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Feature 4 */}
      <section className="promo-section d-flex align-items-center text-black px-4 py-5 bgc2">
        <div className="container">
          <div className="row align-items-center flex-md-row-reverse">
            <div className="col-md-6">
              <h2 className="fw-bold mb-3">📅 Trip History & Upcoming Trips</h2>
              <p className="mb-4">View past trips, bookings, and future planned journeys. Option to repeat or copy trips for frequent travelers.</p>
              <button className="btn btn-light text-primary fw-semibold px-4" onClick={() => navigate('/triphistory')}>Learn More</button>
            </div>
            <div className="col-md-6 text-center mt-4 mt-md-0">
              <img src="../../images/pic4.png" alt="Location Tracking" className="img-fluid" style={{ maxHeight: '250px' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Trip Mitra */}
      <section className="why-choose">
        <h2>Why Choose <span>Trip Mitra?</span></h2>
        <div className="features-grid">
          <div className="feature-box">
            <i className="fas fa-user-check"></i>
            <h3>Safe & Verified Riders</h3>
            <p>All riders are verified and reviewed for your safety.</p>
          </div>
          <div className="feature-box">
            <i className="fas fa-rupee-sign"></i>
            <h3>Affordable Travel</h3>
            <p>Pool your ride and save more with every trip.</p>
          </div>
          <div className="feature-box">
            <i className="fas fa-mobile-alt"></i>
            <h3>Easy to Use</h3>
            <p>Plan, join or manage trips in just a few clicks.</p>
          </div>
          <div className="feature-box">
            <i className="fas fa-headset"></i>
            <h3>24/7 Support</h3>
            <p>We’re here for you anytime, anywhere.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
