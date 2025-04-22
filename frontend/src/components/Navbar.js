import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          AI Healthcare
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-blue-200">Home</Link>
          <Link to="/symptoms" className="text-white hover:text-blue-200">Symptom Checker</Link>
          <Link to="/appointments" className="text-white hover:text-blue-200">Appointments</Link>
          <Link to="/health-data" className="text-white hover:text-blue-200">Health Tracker</Link>
          <Link to="/dashboard" className="text-white hover:text-blue-200">Dashboard</Link>
          <Link to="/login" className="text-white hover:text-blue-200">Login</Link>
          <Link to="/register" className="text-white hover:text-blue-200">Register</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;