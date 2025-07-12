import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'http://localhost:5000';

const DoctorProfilePage = () => {
  const [doctor, setDoctor] = useState(null);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        return;
      }

      try {
        const doctorRes = await axios.get(`${BASE_URL}/api/doctors/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!doctorRes || !doctorRes.data) {
          console.error('Doctor response is empty or invalid');
          return;
        }

        setDoctor(doctorRes.data);
      } catch (err) {
        console.error('Failed to fetch doctor data:', err);
      }
    };

    fetchDoctorProfile();
  }, []);

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-100 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xl text-teal-700 font-medium">Loading Profile...</p>
        </div>
      </div>
    );
  }

  const photoUrl =
    doctor.profilePhoto && !imageError
      ? doctor.profilePhoto.startsWith('http')
        ? doctor.profilePhoto
        : `${BASE_URL}${doctor.profilePhoto}`
      : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-100 p-6 pt-[6rem]">
      <div className="max-w-6xl mx-auto">
        <header className="bg-white shadow-2xl rounded-2xl p-6 mb-10 border-t-4 border-teal-600 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-teal-700 tracking-tight">
            Dr. {doctor.name}'s Profile
          </h2>
          <p className="mt-2 text-gray-600 text-lg md:text-xl">
            Welcome to your Professional Dashboard
          </p>
        </header>

        <div className="bg-white shadow-xl rounded-2xl p-8 md:p-10 space-y-8">
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Profile Image */}
            <div>
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt="Profile"
                  className="w-52 h-52 rounded-full object-cover border-4 border-teal-200 shadow-lg"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-52 h-52 rounded-full bg-teal-100 flex items-center justify-center text-6xl text-teal-600 font-bold uppercase border-4 border-teal-200 shadow-lg">
                  {doctor.name.charAt(0)}
                </div>
              )}
            </div>

            {/* Doctor Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <ProfileCard label="Name" value={`Dr. ${doctor.name}`} />
              <ProfileCard label="Email" value={doctor.email} />
              <ProfileCard label="Phone" value={doctor.phoneNumber} />
              <ProfileCard label="Location" value={doctor.location} />
              <ProfileCard label="Specialization" value={doctor.specialization} />
              <ProfileCard label="Consultation Fees" value={`₹${doctor.fees}`} color="green" />
              <ProfileCard label="About" value={doctor.about} />
              <ProfileCard label="Experience" value={doctor.experience} />
              <ProfileCard label="Achievements" value={doctor.achievements} />
              <ProfileCard label="Rating" value={doctor.rating} color="yellow" />
              <ProfileCard label="Other Info" value={doctor.other} className="md:col-span-2" />
            </div>
          </div>

          {/* Certification Link */}
          {doctor.certification && (
            <div className="text-center">
              <a
                href={doctor.certification}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 hover:text-teal-800 font-medium underline transition duration-200"
              >
                View Certification Document
              </a>
            </div>
          )}

          {/* Action Buttons */}
          <div className="text-center space-x-4 pt-6">
            <ActionButton text="View Chat Messages" color="teal" onClick={() => navigate('/doctor/chatlist')} />
            <ActionButton text="Edit Profile" color="indigo" onClick={() => navigate('/doctor/edit-profile')} />
            <ActionButton text="Book Appointment" color="green" onClick={() => navigate(`/book-appointment/${doctor._id}`)} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileCard = ({ label, value, color = 'gray', className = '' }) => (
  <div className={`p-5 bg-teal-50 rounded-xl shadow-sm ${className}`}>
    <p className="text-sm text-gray-500 font-medium">{label}</p>
    <p className={`text-lg font-medium text-${color}-800 break-words`}>{value || 'N/A'}</p>
  </div>
);

const ActionButton = ({ text, onClick, color }) => (
  <button
    onClick={onClick}
    className={`bg-${color}-600 text-white px-6 py-3 rounded-lg hover:bg-${color}-700 transform hover:scale-105 transition duration-300 font-semibold shadow-md`}
  >
    {text}
  </button>
);

export default DoctorProfilePage;
