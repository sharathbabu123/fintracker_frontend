// src/layouts/DashboardLayout.jsx
import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './DashboardLayout.css'; // optional for styling

const DashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token and user from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <nav>
          <ul>
            <li>
              <NavLink to="/dashboard" end>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/transactions">Transactions</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/goals">Goals</NavLink>
            </li>

            {/* Logout button */}
            <li style={{ marginTop: '2rem' }}>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content area */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
