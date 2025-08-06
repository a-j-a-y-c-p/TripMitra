import React from 'react';
import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function HeroCarousel() {
  const navigate = useNavigate();

  return (
    <div>
      <Carousel fade interval={4000}>
        {/* Slide 1 */}
        <Carousel.Item>
          <div
            className="text-center text-white p-5"
            style={{
              backgroundImage: "url('/images/carousel1.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '100vh',
            }}
          >
            <h1 className="display-4 fw-bold">Welcome to Trip Mitra</h1>
            <p className="lead">Your Ultimate Travel Companion</p>
            <button className="btn btn-primary btn-lg mt-3" onClick={() => navigate('/dashboard')}>
              Explore Trips
            </button>
          </div>
        </Carousel.Item>

        {/* Slide 2 */}
        <Carousel.Item>
          <div
            className="text-center text-white p-5"
            style={{
              backgroundImage: "url('/images/carousel2.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '100vh',
            }}
          >
            <h1 className="display-4 fw-bold">Discover Hidden Gems</h1>
            <p className="lead">Plan, Explore, and Enjoy Seamlessly</p>
            <button className="btn btn-success btn-lg mt-3" onClick={() => navigate('/dashboard')}>
              Start Your Journey
            </button>
          </div>
        </Carousel.Item>

        {/* Slide 3 */}
        <Carousel.Item>
          <div
            className="text-center text-white p-5"
            style={{
              backgroundImage: "url('/images/carousel3.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '100vh',
            }}
          >
            <h1 className="display-4 fw-bold">Trusted by Thousands</h1>
            <p className="lead">Find the Best Places to Travel</p>
            <button className="btn btn-warning btn-lg mt-3" onClick={() => navigate('/dashboard')}>
              Get Inspired
            </button>
          </div>
        </Carousel.Item>

        {/* Slide 4 */}
        <Carousel.Item>
          <div
            className="text-center text-white p-5"
            style={{
              backgroundImage: "url('/images/carousel4.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '100vh',
            }}
          >
            <h1 className="display-4 fw-bold">Travel Made Easy</h1>
            <p className="lead">Join or Offer Rides Instantly</p>
            <button className="btn btn-danger btn-lg mt-3" onClick={() => navigate('/dashboard')}>
              Ride Now
            </button>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
