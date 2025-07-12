import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PendingAppoinment = () => {
  const [appointments, setAppointments] = useState([]);
  const BASE_URL = 'http://localhost:5000';

  useEffect(() => {
    const fetchPendingAppointments = async () => {
      try {
        const token = localStorage.getItem('token');

        // Get doctor ID using token
        const doctorRes = await axios.get(`${BASE_URL}/api/doctors/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const doctorId =
          doctorRes.data._id ||
          doctorRes.data.user?._id ||
          doctorRes.data.id;

        // Fetch all appointments for doctor
        const appointmentRes = await axios.get(
          `${BASE_URL}/api/appointments/doctor/${doctorId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Filter only pending ones
        const pending = appointmentRes.data.filter((a) => !a.isCompleted);
        setAppointments(pending);
      } catch (error) {
        console.error('Error fetching pending appointments:', error);
      }
    };

    fetchPendingAppointments();
  }, []);

  return (
    <div className="p-6 mt-20">
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h3 className="text-2xl font-bold text-red-700 mb-4">⏳ Pending Appointments</h3>
        {appointments.length > 0 ? (
          <ul className="space-y-4">
            {appointments.map((appointment) => (
              <li key={appointment._id} className="border p-4 rounded-lg bg-yellow-50">
                <p><strong>👤 User Name:</strong> {appointment.user?.name || 'N/A'}</p>
                <p><strong>📧 Email:</strong> {appointment.user?.email || 'N/A'}</p>
                <p><strong>📅 Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                <p><strong>⏰ Time:</strong> {appointment.time}</p>
                <p><strong>📝 Description:</strong> {appointment.description || 'N/A'}</p>

                {appointment.test ? (
                  <a
                    href={`${BASE_URL}${appointment.test}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-green-700 underline mt-2 block"
                  >
                    🧾 View Uploaded Test Report
                  </a>
                ) : (
                  <p className="text-gray-500 italic">No report uploaded yet.</p>
                )}

                {appointment.roomId ? (
                  <a
                    href={`http://localhost:3000/video-call/${appointment._id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                  >
                    🎥 Join Video Call
                  </a>
                ) : (
                  <p className="text-gray-500 italic">Room ID not assigned yet.</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 italic">No pending appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default PendingAppoinment;
