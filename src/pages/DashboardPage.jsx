import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import API_BASE_URL from "../config";

const DashboardPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [chartData, setChartData] = useState([]);

  const userJSON = localStorage.getItem("user");
  const user = userJSON ? JSON.parse(userJSON) : null;

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token || !user) return;

      try {
        const [expenseRes, incomeRes] = await Promise.all([
          fetch(`${API_BASE_URL}/expenses?userId=${user.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_BASE_URL}/income?userId=${user.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);
        const expensesData = await expenseRes.json();
        const incomeData = await incomeRes.json();

        setExpenses(expensesData);
        setIncome(incomeData);

        // Build a chart-friendly array, for example, grouping by date
        const grouped = {};
        expensesData.forEach((exp) => {
          const dateKey = exp.date_of_transaction || 'No date';
          if (!grouped[dateKey]) {
            grouped[dateKey] = { date: dateKey, expenses: 0, income: 0 };
          }
          grouped[dateKey].expenses += exp.amount;
        });
        incomeData.forEach((inc) => {
          const dateKey = inc.date_of_transaction || 'No date';
          if (!grouped[dateKey]) {
            grouped[dateKey] = { date: dateKey, expenses: 0, income: 0 };
          }
          grouped[dateKey].income += inc.amount;
        });

        setChartData(Object.values(grouped));
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, [user]);

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalIncome = income.reduce((sum, i) => sum + i.amount, 0);

  return (
    <div>
      <h1 style={{ marginBottom: '1rem' }}>Dashboard</h1>
      <div>
        <p><strong>Total Expenses:</strong> ₹{totalExpenses}</p>
        <p><strong>Total Income:</strong> ₹{totalIncome}</p>
        <p><strong>Net:</strong> ₹{(totalIncome - totalExpenses).toFixed(2)}</p>
      </div>

      {/* Bar Chart by date */}
      <div style={{ marginTop: '2rem' }}>
        <h2>Transactions Over Time</h2>
        <BarChart
          width={600}
          height={300}
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="expenses" fill="#f44336" name="Expenses" />
          <Bar dataKey="income" fill="#4caf50" name="Income" />
        </BarChart>
      </div>
    </div>
  );
};

export default DashboardPage;
