// src/components/SearchBar.js

import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { FaMapMarkerAlt, FaUser, FaCalendarAlt } from 'react-icons/fa';

export default function SearchBar() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState(1);

  return (
    <div className="bg-white rounded-5 shadow p-3 p-md-4 mt-4" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <Form>
        <Row className="g-2 align-items-center text-center text-md-start">
          <Col xs={12} md={3}>
            <Form.Group controlId="fromInput">
              <Form.Label className="fw-semibold"><FaMapMarkerAlt className="me-1" />Leaving from</Form.Label>
              <Form.Control
                type="text"
                placeholder="City or stop"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={3}>
            <Form.Group controlId="toInput">
              <Form.Label className="fw-semibold"><FaMapMarkerAlt className="me-1" />Going to</Form.Label>
              <Form.Control
                type="text"
                placeholder="Destination"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={2}>
            <Form.Group controlId="dateInput">
              <Form.Label className="fw-semibold"><FaCalendarAlt className="me-1" />Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={2}>
            <Form.Group controlId="passengerInput">
              <Form.Label className="fw-semibold"><FaUser className="me-1" />Passengers</Form.Label>
              <Form.Select
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num} passenger{num > 1 && 's'}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs={12} md={2} className="text-md-end mt-2 mt-md-4">
            <Button variant="primary" size="lg" className="w-100">Search</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
