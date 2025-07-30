import { useState } from "react";
import Delete from "./delete";

function Item({ goal, onDelete, onUpdate }) {
    const [editing, setEditing] = useState(false);
    const [editData, setEditData] = useState(goal);

    function handleEditChange(e) {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    }

    function handleEditSubmit(e) {
        e.preventDefault();
        onUpdate({ ...editData, id: goal.id, targetAmount: Number(editData.targetAmount) });
        setEditing(false);
    }

    function getDeadlineStatus() {
        const now = new Date();
        const deadline = new Date(goal.deadline);
        const diff = (deadline - now) / (1000 * 60 * 60 * 24);
        if (goal.savedAmount >= goal.targetAmount) return "✅ Completed";
        if (diff < 0) return "❌ Overdue";
        if (diff < 30) return "⚠️ Less than 30 days left!";
        return "";
    }

    return (
        <div style={{ border: "1px solid #ccc", padding: "10px" }}>
            {editing ? (
                <form onSubmit={handleEditSubmit}>
                    <input name="name" value={editData.name} onChange={handleEditChange} />
                    <input name="targetAmount" type="number" value={editData.targetAmount} onChange={handleEditChange} />
                    <input name="category" value={editData.category} onChange={handleEditChange} />
                    <input name="deadline" type="date" value={editData.deadline} onChange={handleEditChange} />
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setEditing(false)}>Cancel</button>
                </form>
            ) : (
                <>
                    <h3>{goal.name}</h3>
                    <p>Category: {goal.category}</p>
                    <p>Target: ${goal.targetAmount}</p>
                    <p>Saved: ${goal.savedAmount}</p>
                    <p>Deadline: {goal.deadline} {getDeadlineStatus()}</p>
                    <progress value={goal.savedAmount} max={goal.targetAmount} style={{ width: "100%" }}></progress>
                    <br />
                    <button onClick={() => setEditing(true)}>Edit</button>
                    <Delete id={goal.id} onDelete={onDelete} />
                </>
            )}
        </div>
    );
}

export default Item