// Example snippet inside IncomeTracker.js
import React, { useState } from 'react';

function IncomeTracker({ addIncome }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState('');
  const [transactionType, setTransactionType] = useState('one-time');

  const handleAddIncome = async () => {
    // Validate form, e.g. ensure date/amount are filled

    const newIncome = {
      userId: 123, // get from localStorage or props
      amount: parseFloat(amount),
      category,
      date,
      transactionType
    };
    // POST to your /income route
    try {
      const res = await fetch('/income', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newIncome)
      });
      const data = await res.json();
      // addIncome is presumably a state setter that merges the new income
      addIncome((prev) => [...prev, data]);
      // Clear fields
      setAmount('');
      setDate('');
      setTransactionType('one-time');
    } catch (err) {
      console.error('Error adding income:', err);
    }
  };

  return (
    <div>
      <h2>Add Income</h2>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Food">Food</option>
        <option value="Rent">Rent</option>
        <option value="Utilities">Utilities</option>
        {/* etc. */}
      </select>

      {/* New fields */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <select
        value={transactionType}
        onChange={(e) => setTransactionType(e.target.value)}
      >
        <option value="one-time">One-Time</option>
        <option value="recurring-monthly">Recurring (Monthly)</option>
        <option value="recurring-weekly">Recurring (Weekly)</option>
        {/* etc. */}
      </select>

      <button onClick={handleAddIncome}>Add</button>
    </div>
  );
}

export default IncomeTracker;
