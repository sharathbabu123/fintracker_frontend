// src/pages/TransactionsPage.jsx
import React from "react";
import ExpenseTracker from "../components/ExpenseTracker";
import IncomeTracker from "../components/IncomeTracker"; // (Assuming you have this component)

const TransactionsPage = () => {
  return (
    <div>
      <h1>Transactions</h1>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Expenses</h2>
        <ExpenseTracker />
      </section>

      <section>
        <h2>Income</h2>
        <IncomeTracker />
      </section>
    </div>
  );
};

export default TransactionsPage;
