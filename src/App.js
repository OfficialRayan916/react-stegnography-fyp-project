import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToHash from "./components/ScrollToHash"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Tools from "./pages/Tools";
import Dashboard from "./pages/Dashboard";
import ImageStego from "./pages/ImageStego";
import AudioStego from "./pages/AudioStego";
import VideoStego from "./pages/VideoStego";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";


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


        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>


  );
}

export default App;