import Item from "./item";

function List({ goals, setgoals, onDelete, onUpdate }) {
    const style = {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '20px',
        width: '100%',
    };
    return (
        <div>
            <h2 style={{ textAlign: "center" }}>MY GOALS</h2>
            <div style={style}>
                {goals.map(goal => (
                    <Item
                        key={goal.id}
                        goal={goal}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                    />
                ))}
            </div>
        </div>
    );
}export default List