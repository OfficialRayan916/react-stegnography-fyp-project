import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToHash from "./components/ScrollToHash"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Tools from "./pages/Tools";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ImageStego from "./pages/ImageStego";
import AudioStego from "./pages/AudioStego";
import VideoStego from "./pages/VideoStego";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import History from "./pages/History";
import AdminHistory from "./pages/AdminHistory";
import AdminLogin from "./pages/AdminLogin";
import AdminUser from "./pages/AdminUser";


function App() {
  return (
    <BrowserRouter>

      <ScrollToHash />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<Tools />} />


        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="//admin-history"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="//admin-user"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/imageStego"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <ImageStego />
            </ProtectedRoute>
          }
        />

        <Route
          path="/audioStego"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <AudioStego />
            </ProtectedRoute>
          }
        />

        <Route
          path="/videoStego"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <VideoStego />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <History />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <Profile />
            </ProtectedRoute>
          }
        />


        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>


  );
}

export default App;