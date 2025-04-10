import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSignup = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    
    // Clear any errors
    setError("");
    
    // Here you would typically:
    // 1. Send the registration data to your backend
    // 2. Handle the response
    // 3. Store authentication info if successful
    console.log("Signing up with:", formData);
    
    // Navigate to login page after successful signup
    navigate("/login");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: "90vh" }}>
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h2 className="text-center">Create Account</h2>
        {error && <div className="alert alert-danger py-2">{error}</div>}
        <form onSubmit={handleSignup}>
          <div className="form-group mb-3">
            <label>Username</label>
            <input 
              type="text" 
              className="form-control" 
              name="username"
              value={formData.username}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="form-group mb-3">
            <label>Email Address</label>
            <input 
              type="email" 
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="form-group mb-3 position-relative">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ paddingRight: "40px" }}
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
          
          <div className="form-group mb-3 position-relative">
            <label>Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="form-control"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={{ paddingRight: "40px" }}
            />
            <span
              className="position-absolute"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{
                top: "72%",
                right: "10px",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#666",
              }}
            >
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          
          <div className="form-check mb-3">
            <input type="checkbox" className="form-check-input" id="termsCheck" required />
            <label className="form-check-label" htmlFor="termsCheck" style={{ fontSize: "14px" }}>
              I agree to the <a href="#" className="text-decoration-none">Terms & Conditions</a>
            </label>
          </div>
          
          <button type="submit" className="btn btn-primary w-100">
            Create Account
          </button>
          
          {/* Login Section */}
          <div className="text-center mt-3">
            <span style={{ fontSize: "14px", color: "#555" }}>
              Already have an account?{" "}
              <a href="/login" className="text-decoration-none" style={{ color: "#007bff" }}>
                Login
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;