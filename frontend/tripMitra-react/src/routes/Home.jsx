import React from 'react';
import HeroCarousel from '../routes/HeroCarousel.jsx';

const Home = () => {
  const destinations = [
    {
      name: 'Goa',
      description: 'Sun, sand, and sea – your perfect beach getaway.',
      image: 'https://source.unsplash.com/400x300/?goa,beach',
    },
    {
      name: 'Manali',
      description: 'Snowy peaks and cozy vibes in the Himalayas.',
      image: 'https://source.unsplash.com/400x300/?manali,mountains',
    },
    {
      name: 'Ratnagiri',
      description: 'Konkan coast charm and cultural richness.',
      image: 'https://source.unsplash.com/400x300/?ratnagiri,coast',
    },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      review: 'Trip Mitra made our honeymoon unforgettable!',
    },
    {
      name: 'Amit Verma',
      review: 'Easy to plan and super helpful guides.',
    },
    {
      name: 'Sneha Patil',
      review: 'The best platform for budget travel with friends!',
    },
  ];

  return (
    <div className="container mt-5">
      {/* Hero Section */}
      <HeroCarousel />

      {/* Featured Destinations */}
      <section className="mt-5">
        <h2 className="text-center mb-4">🌍 Featured Destinations</h2>
        <div className="row">
          {destinations.map((place, idx) => (
            <div className="col-md-4 mb-4" key={idx}>
              <div className="card h-100 shadow-sm">
                <img
                  src={place.image}
                  className="card-img-top"
                  alt={place.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{place.name}</h5>
                  <p className="card-text">{place.description}</p>
                  <a href="#" className="btn btn-outline-primary">View More</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mt-5 bg-secondary text-white p-5 rounded-4">
        <h2 className="text-center mb-4">💬 What Travelers Say</h2>
        <div className="row">
          {testimonials.map((t, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <div className="bg-white text-dark rounded-3 p-3 shadow">
                <p className="fst-italic">“{t.review}”</p>
                <p className="fw-bold mb-0 text-end">– {t.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
    </div>
  );
};

export default Home;
