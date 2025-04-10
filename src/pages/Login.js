import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom"; // Import Link component

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Create navigate function

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault();
    // Navigate to the dashboard after login
    navigate("/dashboard");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: "90vh" }}>
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <label>Username</label>
            <input type="text" className="form-control" required />
          </div>
          <div className="form-group mb-3 position-relative">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              required
              style={{ paddingRight: "40px" }} // Space for the icon
            />
            <span
              className="position-absolute"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                top: "72%",
                right: "10px",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#666",
              }}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
          {/* Forgot Password Link */}
          <div className="text-center mt-2">
            <a href="#" className="text-decoration-none" style={{ color: "#007bff", fontSize: "14px" }}>
              Forgot Password?
            </a>
          </div>
          {/* Sign Up Section - Updated to use Link */}
          <div className="text-center mt-3">
            <span style={{ fontSize: "14px", color: "#555" }}>
              New to Nexus?{" "}
              <Link to="/signup" className="text-decoration-none" style={{ color: "#007bff" }}>
                Sign up!
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;