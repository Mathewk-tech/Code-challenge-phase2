import React from "react";

function Overview({ goals }) {
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, goal) => sum + Number(goal.savedAmount || 0), 0);
  const totalTarget = goals.reduce((sum, goal) => sum + Number(goal.targetAmount || 0), 0);

  return (
    <div>
      <h2>Overview</h2>
      <p>Total Goals: {totalGoals}</p>
      <p>Total Saved: ${totalSaved}</p>
      <p>Total Target: ${totalTarget}</p>
    </div>
  );
}

export default Overview;