import React from 'react';
import HeroCarousel from './HeroCarousel'; // updated path suggestion
import '../CSS/Home.css'; // updated path suggestion

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <HeroCarousel />

      {/* Feature 1 */}
            

      <section className="promo-section d-flex align-items-center text-white px-4 py-5 bg-primary">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2 className="fw-bold mb-3">🔍 Smart Search & Filter</h2>
              <p className="mb-4">
                Users can search for trips based on source, destination, travel date, and time. Filter by preferences like budget, mode of travel (car/bike), and gender preference.
              </p>
              <button className="btn btn-light text-primary fw-semibold px-4">
                Learn More
              </button>
            </div>
            <div className="col-md-6 text-center mt-4 mt-md-0">
              <img
                src="../../images/pic1.png"
                alt="Illustration of happy travelers"
                className="img-fluid"
                style={{ maxHeight: '250px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature 2 */}
      <section className="promo-section d-flex align-items-center text-white px-4 py-5 bg-warning">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2 className="fw-bold mb-3">👤 User Profiles & Authentication</h2>
              <p className="mb-4">
                Secure login/signup for riders and passengers. Profile includes user ratings, travel history, and contact info.
              </p>
              <button className="btn btn-light text-primary fw-semibold px-4">
                Learn More
              </button>
            </div>
            <div className="col-md-6 text-center mt-4 mt-md-0">
              <img
                src="../../images/pic2.png"
                alt="Illustration of happy travelers"
                className="img-fluid"
                style={{ maxHeight: '250px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature 3 */}
      <section className="promo-section d-flex align-items-center text-white px-4 py-5 bg-primary">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2 className="fw-bold mb-3">🛣️ Post & Join Trips</h2>
              <p className="mb-4">
                Users can create/post a trip with travel details. Other users can join available trips by sending a request or booking directly.
              </p>
              <button className="btn btn-light text-primary fw-semibold px-4">
                Learn More
              </button>
            </div>
            <div className="col-md-6 text-center mt-4 mt-md-0">
              <img
                src="../../images/pic3.png"
                alt="Illustration of happy travelers"
                className="img-fluid"
                style={{ maxHeight: '250px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature 4 */}
      <section className="promo-section d-flex align-items-center text-white px-4 py-5 bg-warning">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2 className="fw-bold mb-3">📍 Real-time Location Tracking</h2>
              <p className="mb-4">
                Live tracking of ongoing trips (can be integrated with Google Maps API). Estimated Time of Arrival (ETA) shown.
              </p>
              <button className="btn btn-light text-primary fw-semibold px-4">
                Learn More
              </button>
            </div>
            <div className="col-md-6 text-center mt-4 mt-md-0">
              <img
                src="../../images/pic4.png"
                alt="Illustration of happy travelers"
                className="img-fluid"
                style={{ maxHeight: '250px' }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
