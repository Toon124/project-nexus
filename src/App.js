import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile"; 
import SubmitReq from "./pages/SubmitReq";
import Signup from "./pages/Signup";
import Confirmation from "./pages/Confirmation"

function App() {
  const location = useLocation(); // Get current route

  return (
    <>
      {/* Show Navbar only if NOT on the login page */}
      {location.pathname !== "/login" && location.pathname !== "/signup" && <Navbar />}

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/submit-request" element={<SubmitReq />} /> 
          <Route path="/submit-request" element={<Confirmation />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
