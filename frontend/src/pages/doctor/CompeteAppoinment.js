import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CompeteAppoinment = () => {
  const [appointments, setAppointments] = useState([]);
  const BASE_URL = 'http://localhost:5000';

  useEffect(() => {
    const fetchCompletedAppointments = async () => {
      const token = localStorage.getItem('token');
      const doctorRes = await axios.get(`${BASE_URL}/api/doctors/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const doctorId = doctorRes.data._id ||
          doctorRes.data.user?._id ||
          doctorRes.data.id;

      const appointmentRes = await axios.get(
        `${BASE_URL}/api/appointments/doctor/${doctorId}?completed=true`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAppointments(appointmentRes.data);
    };

    fetchCompletedAppointments();
  }, []);

  return (
    <div className="p-6 mt-20">
      <h2 className="text-2xl font-bold mb-4">✅ Completed Appointments</h2>
      {appointments.map((a) => (
        <div key={a._id} className="bg-white p-4 rounded shadow mb-4">
          <p><strong>User:</strong> {a.user?.name}</p>
          <p><strong>Date:</strong> {new Date(a.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {a.time}</p>
          <p className="text-green-600 font-semibold">✔ Completed</p>
        </div>
      ))}
    </div>
  );
};

export default CompeteAppoinment;
