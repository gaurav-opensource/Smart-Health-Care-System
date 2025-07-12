import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AppointmentForm = () => {
  const { doctorId } = useParams();
  const [appointmentDate, setAppointmentDate] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const userId = localStorage.userId; // You must save user ID after login

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/appointments', {
        userId,
        doctorId,
        appointmentDate,
        description,
      });

      alert('Appointment booked successfully!');
      navigate('/user/profile');
    } catch (err) {
      console.error('Error booking appointment:', err);
      alert('Error booking appointment');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-4">Book Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label>Date:</label>
          <input
            type="datetime-local"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
