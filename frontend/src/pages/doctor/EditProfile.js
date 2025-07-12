import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'http://localhost:5000';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    about: '',
    experience: '',
    achievements: '',
    other: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctor = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`${BASE_URL}/api/doctors/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { about, experience, achievements, other } = res.data;
        setFormData({
          about: about || '',
          experience: experience || '',
          achievements: achievements || '',
          other: other || '',
        });
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch doctor:', err);
        setLoading(false);
      }
    };

    fetchDoctor();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await axios.put(`${BASE_URL}/api/doctors/update-profile`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Profile updated successfully!');
      setTimeout(() => navigate('/doctor/profile'), 1500);
    } catch (err) {
      console.error('Update failed:', err);
      setMessage('Failed to update profile.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-24 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-teal-700 text-center">Edit Your Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 text-gray-700 font-medium">About</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Experience</label>
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Achievements</label>
          <input
            type="text"
            name="achievements"
            value={formData.achievements}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Other Info</label>
          <textarea
            name="other"
            value={formData.other}
            onChange={handleChange}
            rows={2}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        {message && (
          <p className="text-center font-medium text-green-600">{message}</p>
        )}

        <div className="text-center">
          <button
            type="submit"
            className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
