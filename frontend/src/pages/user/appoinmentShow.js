import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const userId = localStorage.getItem('userId'); // make sure userId is stored on login
  const roomId = localStorage.getItem('roomId')

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/appointments/user/${userId}`);
        setAppointments(res.data);
      } catch (err) {
        console.error('Error fetching appointments:', err);
      }
    };

    if (userId) {
      fetchAppointments();
    }
  }, [userId]);

  return (
    <div>
      <h2>Your Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <ul>
          {appointments.map((appt) => (
            <li key={appt._id}>
              <p><strong>Doctor:</strong> {appt.doctor.name}</p>
              <p><strong>Date:</strong> {appt.date}</p>
              <p><strong>Time:</strong> {appt.time}</p>
              <p><strong>Description:</strong> {appt.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserAppointments;
