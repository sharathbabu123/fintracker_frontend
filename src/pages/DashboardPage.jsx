// src/pages/DashboardPage.jsx
import React, { useEffect, useState } from "react";
import API_BASE_URL from "../config";

const DashboardPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);

  // Retrieve user from localStorage or via context
  const userJSON = localStorage.getItem("user");
  const user = userJSON ? JSON.parse(userJSON) : null;

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token || !user) return;

      try {
        const expenseRes = await fetch(`${API_BASE_URL}/expenses?userId=${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const incomeRes = await fetch(`${API_BASE_URL}/income?userId=${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setExpenses(await expenseRes.json());
        setIncome(await incomeRes.json());
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [user]);

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalIncome = income.reduce((sum, inc) => sum + inc.amount, 0);

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="summary-section">
        <p>Total Expenses: ₹{totalExpenses}</p>
        <p>Total Income: ₹{totalIncome}</p>
      </div>

      {/* You could add charts or other stats here */}
    </div>
  );
};

export default DashboardPage;
