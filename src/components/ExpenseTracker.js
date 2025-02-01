import { useState } from "react";
import API_BASE_URL from "../config";

const ExpenseTracker = ({ addExpense }) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount) return;

    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE_URL}/expenses`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ amount: parseFloat(amount), category }),
    });

    const data = await res.json();
    addExpense((prev) => [...prev, data]);
    setAmount("");
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-bold">Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)}
          className="border p-2 w-full mt-2 rounded" />
        <select value={category} onChange={(e) => setCategory(e.target.value)}
          className="border p-2 w-full mt-2 rounded">
          <option>Food</option>
          <option>Transport</option>
          <option>Rent</option>
          <option>Entertainment</option>
          <option>Others</option>
        </select>
        <button className="mt-3 bg-blue-500 text-white p-2 w-full rounded">Add</button>
      </form>
    </div>
  );
};

export default ExpenseTracker;
