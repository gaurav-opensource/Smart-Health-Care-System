import React from "react";
import { useNavigate } from "react-router-dom";

const UserHome = () => {
  const navigate = useNavigate();

  const handleFindDoctor = () => {
    navigate("/doctor/list");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HERO SECTION */}
      <div className="relative h-[70vh] w-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600880292089-90e6aef70b56?auto=format&fit=crop&w=1600&q=80')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-white text-center p-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to HealthMate 🩺</h1>
          <p className="text-lg md:text-xl max-w-2xl">
            Find expert doctors, book appointments, upload reports, and take control of your health — all in one place.
          </p>
          <button
            onClick={handleFindDoctor}
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg text-lg transition-all"
          >
            🔍 Find a Doctor
          </button>
        </div>
      </div>

      {/* CARD SECTION */}
      <section className="py-12 px-4 md:px-16 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">What You Can Do</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Search Doctors",
              desc: "Find doctors by specialization, location, or availability.",
              icon: "https://cdn-icons-png.flaticon.com/512/1055/1055644.png",
            },
            {
              title: "Book Appointments",
              desc: "Easily schedule appointments with just a few clicks.",
              icon: "https://cdn-icons-png.flaticon.com/512/2921/2921222.png",
            },
            {
              title: "Upload Reports",
              desc: "Securely upload and share your lab reports and files.",
              icon: "https://cdn-icons-png.flaticon.com/512/3602/3602123.png",
            },
            {
              title: "Chat & Video Call",
              desc: "Connect with your doctor through chat or video calls.",
              icon: "https://cdn-icons-png.flaticon.com/512/2942/2942719.png",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-xl transition-all duration-300 text-center"
            >
              <img src={item.icon} alt={item.title} className="w-20 h-20 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 text-sm text-gray-500">
        © 2025 HealthMate — Stay healthy, stay connected.
      </footer>
    </div>
  );
};

export default UserHome;
