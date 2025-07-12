import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminProfilePage = () => {
  const [admin, setAdmin] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/admin/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdmin(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchUnverifiedDoctors = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/doctors/unverified`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDoctors(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAdmin();
    fetchUnverifiedDoctors();
  }, [token]);

  const verifyDoctor = async (doctorId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/verify-doctor/${doctorId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDoctors(doctors.filter((doc) => doc._id !== doctorId));
    } catch (error) {
      console.error('Error verifying doctor:', error);
    }
  };

  if (!admin) return <p className="text-center mt-10 text-gray-500">Loading admin profile...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">Admin Profile</h2>
        <p><strong>Name:</strong> {admin.name}</p>
        <p><strong>Email:</strong> {admin.email}</p>
        <p><strong>Role:</strong> {admin.role}</p>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold text-purple-700 mb-4">Unverified Doctors</h3>
        {doctors.length === 0 ? (
          <p className="text-gray-600">No unverified doctors found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {doctors.map((doctor) => (
              <div key={doctor._id} className="border rounded p-4 bg-gray-50 shadow">
                <div className="mb-2">
                  <img
                    src={doctor.profilePhoto}
                    alt="Doctor"
                    className="w-24 h-24 rounded-full object-cover border"
                  />
                </div>
                <p><strong>Name:</strong> {doctor.name}</p>
                <p><strong>Email:</strong> {doctor.email}</p>
                <p><strong>Phone:</strong> {doctor.phoneNumber}</p>
                <p><strong>Location:</strong> {doctor.location}</p>
                <p><strong>Fees:</strong> ₹{doctor.fees}</p>
                <p><strong>License No:</strong> {doctor.licenseNumber}</p>
                <p><strong>Specialization:</strong> {doctor.specialization}</p>
                <p>
                  <strong>Certification:</strong>{' '}
                  <a
                    href={doctor.certification}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Certificate
                  </a>
                </p>
                <button
                  onClick={() => verifyDoctor(doctor._id)}
                  className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                  Verify Doctor
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProfilePage;
