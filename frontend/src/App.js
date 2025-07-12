import React from "react";
import { Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout";
import PublicLayout from "./layouts/PublicLayout";

// Public pages (no Navbar/Footer)
import LoginPage from "./auth/login";
import SignupPage from "./auth/signup";

// User pages
import UserHome from "./pages/user/Home";
import UserProfilePage from "./pages/user/userProfile";
import DoctorListPage from "./pages/user/DoctorListPage";
import AppointmentForm from "./pages/user/Apponinment";
import PaymentPage from "./pages/doctor/payment";

// Doctor pages
import DoctorHome from "./pages/doctor/Home";
import DoctorProfilePage from "./pages/doctor/doctorProfile";

// Admin pages
import AdminHome from "./pages/admin/Home";
import AdminProfilePage from "./pages/admin/adminProfile";
import Home from "./Home";
import VideoMeetComponent from "./socket/VidoesCall";

import DoctorRatingPage from "./pages/doctor/DoctorRating";
import PendingAppoinment from "./pages/doctor/PendingAppoinment";

import CompeteAppoinment from "./pages/doctor/CompeteAppoinment";
import EditProfile from "./pages/doctor/EditProfile";
function App() {
  return (
    <Routes>
      {/* Public layout for login/signup */}
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
     <Route path="/video-call/:appoinmentId" element={<VideoMeetComponent />} />

      </Route>

      {/* Main layout for authenticated pages */}
      <Route element={<MainLayout />}>
        {/* User routes */}
        <Route path="/" element={<Home/>} />
        <Route path="/user/home" element={<UserHome />} />
        <Route path="/user/profile" element={<UserProfilePage />} />
        <Route path="/doctorlist" element={<DoctorListPage />} />
        <Route path="/doctorlist/user/book-appointment/:doctorId" element={<AppointmentForm />} />
        <Route path="/payment" element={<PaymentPage />} />

        {/* Doctor routes */}
        <Route path="/doctor/home" element={<DoctorHome />} />
        <Route path="/doctor/profile" element={<DoctorProfilePage />} />
        <Route path="/rate/:appointmentId/:doctorId" element={<DoctorRatingPage/>} />
        <Route path="/pending/doctor" element={<PendingAppoinment />} />
        <Route path="/compete/doctor" element={<CompeteAppoinment />} />
        <Route path="/doctor/edit-profile" element={<EditProfile/>} />
        

        {/* Admin routes */}
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/profile" element={<AdminProfilePage />} />

        {/* Vidoes call Route */}
        
      </Route>
    </Routes>
  );
}

export default App;
