import { useState } from "react";

const GoalTracker = ({ addGoal }) => {
  const [goal, setGoal] = useState("");
  const [targetAmount, setTargetAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!goal || !targetAmount) return;
    addGoal({ goal, targetAmount: parseFloat(targetAmount), saved: 0 });
    setGoal("");
    setTargetAmount("");
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-bold">Set Financial Goal</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Goal Name" value={goal} onChange={(e) => setGoal(e.target.value)}
          className="border p-2 w-full mt-2 rounded" />
        <input type="number" placeholder="Target Amount" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)}
          className="border p-2 w-full mt-2 rounded" />
        <button className="mt-3 bg-green-500 text-white p-2 w-full rounded">Set Goal</button>
      </form>
    </div>
  );
};

export default GoalTracker;
