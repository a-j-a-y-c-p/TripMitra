import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="app-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
