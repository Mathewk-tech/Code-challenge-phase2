import React, { useEffect, useState } from "react";
import List from "./list";
import Goal from "./AddGoalForm";
import DepositForm from "./Deposit";
import Overview from "./overview";
import "./App.css";

const url = "http://localhost:3000/";

function App() {
  const [goals, setgoals] = useState([]);

  useEffect(() => {
    fetch(`${url}/goals`)
      .then(res => res.json())
      .then(data => setgoals(data));
  }, []);

  function handleDelete(id) {
    fetch(`${url}/goals/${id}`, { method: "DELETE" })
      .then(() => fetch(`${url}/goals`))
      .then(res => res.json())
      .then(data => setgoals(data));
  }

  function handleAddGoal(newGoal) {
    fetch(`${url}/goals`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGoal)
    })
      .then(res => res.json())
      .then(goal => setgoals([...goals, goal]));
  }

  function handleUpdateGoal(updatedGoal) {
    fetch(`${url}/goals/${updatedGoal.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedGoal)
    })
      .then(res => res.json())
      .then(goal => setgoals(goals.map(g => g.id === goal.id ? goal : g)));
  }

  function handleDeposit(id, amount) {
    const goal = goals.find(g => g.id === id);
    const updatedGoal = { ...goal, savedAmount: Number(goal.savedAmount) + Number(amount) };
    handleUpdateGoal(updatedGoal);
  }

  return (
    <div>
      <h1>Smart Goal Planner</h1>
      <Overview goals={goals} />
      <Goal onAddGoal={handleAddGoal} />
      <DepositForm goals={goals} onDeposit={handleDeposit} />
      <List goals={goals} setgoals={setgoals} onDelete={handleDelete} onUpdate={handleUpdateGoal} />
    </div>
  );
}

export default App