import React from "react";

const AdminHomePage = () => {
  const adminName = "Admin"; // Optional: Dynamically fetch from user state

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-6">
      {/* Welcome Section */}
      <div className="bg-white shadow-lg rounded-2xl p-8 mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-3">
          Welcome, {adminName} 🧑‍💼
        </h1>
        <p className="text-gray-700 text-lg">Here is the overview of the HealthMate platform.</p>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          {
            title: "Total Users",
            count: 1200,
            icon: "👥",
            color: "bg-blue-100 text-blue-600",
          },
          {
            title: "Doctors Registered",
            count: 310,
            icon: "🩺",
            color: "bg-green-100 text-green-600",
          },
          {
            title: "Pending Verifications",
            count: 14,
            icon: "⏳",
            color: "bg-yellow-100 text-yellow-600",
          },
          {
            title: "System Logs",
            count: 47,
            icon: "🧾",
            color: "bg-red-100 text-red-600",
          },
        ].map((item, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl shadow hover:shadow-xl transition-all ${item.color} text-center`}
          >
            <div className="text-4xl mb-2">{item.icon}</div>
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-lg mt-2 font-bold">{item.count}</p>
          </div>
        ))}
      </div>

      {/* Admin Actions Section */}
      <div className="bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">🛠️ Admin Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Verify Doctors",
              desc: "Review and approve pending doctor profiles.",
              bg: "bg-blue-50",
              route: "/admin/verify-doctors",
            },
            {
              title: "Manage Users",
              desc: "View and manage all users of the platform.",
              bg: "bg-green-50",
              route: "/admin/manage-users",
            },
            {
              title: "View Reports",
              desc: "Check activity logs and generate reports.",
              bg: "bg-yellow-50",
              route: "/admin/reports",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl shadow hover:shadow-lg transition-all cursor-pointer ${item.bg}`}
              onClick={() => window.location.href = item.route}
            >
              <h3 className="text-xl font-semibold text-blue-700 mb-2">{item.title}</h3>
              <p className="text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center mt-12 text-sm text-gray-500">
        © 2025 HealthMate Admin Panel
      </footer>
    </div>
  );
};

export default AdminHomePage;
