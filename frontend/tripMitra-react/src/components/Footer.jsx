import React from 'react';
import '../css/Footer.css';

export default function Footer() {
  return (
    <div>
      <footer className="footer-background text-white p-4">
        <div className="row">
          <div className="col-md-4">
            <h5>Trip Mitra</h5>
            <p>Creating unforgettable travel memories one trip at a time.</p>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white">Home</a></li>
              <li><a href="/" className="text-white">Destinations</a></li>
              <li><a href="#" className="text-white">Contact</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Contact</h5>
            <p>Email: support@tripmitra.com</p>
            <p>Phone: +91 98765 43210</p>
          </div>
        </div>
        <hr className="border-light mt-3" />
        <p className="text-center mb-0">© 2025 Trip Mitra. All rights reserved.</p>
      </footer>
    </div>
  );
}