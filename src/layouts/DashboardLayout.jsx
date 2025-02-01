// src/layouts/DashboardLayout.jsx
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './DashboardLayout.css'; // optional, you can create this file for styling

const DashboardLayout = () => {
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
              <NavLink to="/dashboard/expenses">Expenses</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/goals">Goals</NavLink>
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
