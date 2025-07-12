import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'http://localhost:5000';

const DoctorListPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    specialization: '',
    minFees: '',
    maxFees: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchDoctors = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`${BASE_URL}/api/auth/getdoctor`, {
        params: filters,
      });
      setDoctors(data);
    } catch (error) {
      console.error('Failed to fetch doctors:', error);
      setError('Failed to load doctors. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    fetchDoctors();
  };

  // New function for booking appointment button
  const handleBookAppointment = (doctorId) => {
    navigate(`user/book-appointment/${doctorId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 p-6 mt-5">
     
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-800 tracking-tight">
        Find Your Doctor
      </h1>

      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <label htmlFor="location" className="block text-gray-700 font-medium mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Enter location"
              value={filters.location}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>
          <div>
            <label htmlFor="specialization" className="block text-gray-700 font-medium mb-1">
              Specialization
            </label>
            <input
              type="text"
              id="specialization"
              name="specialization"
              placeholder="Enter specialization"
              value={filters.specialization}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>
          <div>
            <label htmlFor="minFees" className="block text-gray-700 font-medium mb-1">
              Min Fees
            </label>
            <input
              type="number"
              id="minFees"
              name="minFees"
              placeholder="Enter min fees"
              value={filters.minFees}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>
          <div>
            <label htmlFor="maxFees" className="block text-gray-700 font-medium mb-1">
              Max Fees
            </label>
            <input
              type="number"
              id="maxFees"
              name="maxFees"
              placeholder="Enter max fees"
              value={filters.maxFees}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              disabled={loading}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 font-medium disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>
      </div>

      {loading && (
        <div className="text-center text-gray-600 text-lg">Loading doctors...</div>
      )}
      {error && (
        <div className="max-w-6xl mx-auto text-center text-red-600 bg-red-100 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {doctors.length === 0 && !loading && !error && (
          <p className="text-center text-gray-600 col-span-full">No doctors found.</p>
        )}
        {doctors.map((doc) => (
          <div
            key={doc._id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            {doc.profilePhoto ? (
              <img
                src={`${BASE_URL}${doc.profilePhoto}`}
                alt={doc.name}
                className="w-28 h-28 object-cover rounded-full mx-auto mb-4 border-2 border-blue-200"
                onError={(e) => (e.target.src = '/fallback-avatar.png')}
              />
            ) : (
              <div className="w-28 h-28 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold border-2 border-blue-200">
                {doc.name[0]}
              </div>
            )}
            <h2 className="text-2xl font-semibold text-center text-gray-800">{doc.name}</h2>
            <p className="text-center text-gray-500 italic">{doc.specialization}</p>
            <p className="text-center text-gray-600 mt-1">{doc.location}</p>
            <p className="text-center text-green-600 font-bold text-lg mt-2">₹{doc.fees}</p>

            <button
              onClick={() => handleBookAppointment(doc._id)}
              className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 font-medium"
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorListPage;
