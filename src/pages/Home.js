import { useEffect, useState } from "react";
import ExpenseTracker from "../components/ExpenseTracker";
import GoalTracker from "../components/GoalTracker";
import ThemeToggle from "../components/ThemeToggle";
import API_BASE_URL from "../config";

const Home = ({ user }) => {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

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

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Finance Tracker</h1>
        <ThemeToggle />
      </div>

      <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h2 className="text-lg font-semibold">Total Expenses: ₹{expenses.reduce((sum, exp) => sum + exp.amount, 0)}</h2>
        <h2 className="text-lg font-semibold">Total Income: ₹{income.reduce((sum, inc) => sum + inc.amount, 0)}</h2>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <ExpenseTracker addExpense={setExpenses} />
        <GoalTracker addGoal={setGoals} />
      </div>
    </div>
  );
};

export default Home;
