import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <ul className="navbar-nav w-100 d-flex justify-content-around">
          <li className="nav-item">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `nav-link ${isActive ? "text-warning" : "text-white"}`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/submit-request"
              className={({ isActive }) =>
                `nav-link ${isActive ? "text-warning" : "text-white"}`
              }
            >
              Submit Request
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `nav-link ${isActive ? "text-warning" : "text-white"}`
              }
            >
              Profile
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
