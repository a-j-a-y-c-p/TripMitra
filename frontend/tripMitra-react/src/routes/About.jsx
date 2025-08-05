import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/About.css';

const About = () => {
  return (
    <div className="container about-container mt-5">
      <h2 className="text-center mb-4">About Us</h2>
      <div className="row align-items-center">
        <div className="col-md-6">
          <img
            src="../../images/temp-logo-tm.png"
            alt="About"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6 mt-4 mt-md-0">
          <p className="about-text">
            Welcome to our project! We're passionate about creating meaningful digital experiences.
            Our aim is to simplify and enhance the way users interact with technology.
            Whether you're a visitor, user, or collaborator, we're here to offer the best tools
            and services to meet your needs.
          </p>
          <p className="about-text">
            This project was built using modern web technologies like React.js, and it reflects our commitment
            to quality, responsiveness, and performance. We believe in continuous learning,
            innovation, and user-first design.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
