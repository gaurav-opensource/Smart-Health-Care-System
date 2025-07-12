import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorHome = () => {
  const doctorName = "Dr. Gaurav Yadav"; // Replace with actual data
  const navigate = useNavigate();

  const cardData = [
    {
      title: "Today's Appointments",
      count: "5",
      icon: "🗓️",
      color: "bg-blue-100 text-blue-600",
      route: "/compete/doctor",
    },
    {
      title: "Pending Appointments ",
      count: "2",
      icon: "📄",
      color: "bg-yellow-100 text-yellow-600",
      route: "/pending/doctor",
    },
    {
      title: "Complete Appointments",
      count: "3",
      icon: "💬",
      color: "bg-green-100 text-green-600",
      route: "/doctor/chatlist",
    },
    {
      title: "Profile Status",
      count: "Verified",
      icon: "✅",
      color: "bg-purple-100 text-purple-600",
      route: "/doctor/profile",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 p-6 pt-[6rem]">
      {/* Welcome Section */}
      <div className="bg-white shadow-xl rounded-2xl p-8 mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-3">
          Welcome, {doctorName} 👨‍⚕️
        </h1>
        <p className="text-gray-700 text-lg">
          Here’s your dashboard overview and next actions.
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {cardData.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.route)}
            className={`p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${item.color} text-center focus:outline-none`}
          >
            <div className="text-4xl mb-2">{item.icon}</div>
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-lg mt-2 font-bold">{item.count}</p>
          </button>
        ))}
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Ready for your next consultation?
        </h2>
        <button
          onClick={() => navigate("/doctor/start-video-call")}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-lg transition transform hover:scale-105"
        >
          🎥 Start Video Consultation
        </button>
      </div>

      {/* Footer */}
      <div className="mt-16 text-center text-sm text-gray-500">
        © 2025 HealthMate — Doctor Portal
      </div>
    </div>
  );
};

export default DoctorHome;
