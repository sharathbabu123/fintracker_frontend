import { useState } from "react";
import ExpenseTracker from "../components/ExpenseTracker";
import GoalTracker from "../components/GoalTracker";
import ProgressBar from "../components/ProgressBar";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [goals, setGoals] = useState([]);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const addGoal = (goal) => {
    setGoals([...goals, goal]);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Finance Tracker</h1>
      <ExpenseTracker addExpense={addExpense} />
      <GoalTracker addGoal={addGoal} />
      <div className="mt-4">
        {goals.map((goal, index) => (
          <div key={index} className="p-4 border rounded-lg mt-4">
            <h2 className="text-lg font-bold">{goal.goal}</h2>
            <p>Saved: ₹{goal.saved} / ₹{goal.targetAmount}</p>
            <ProgressBar saved={goal.saved} target={goal.targetAmount} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
