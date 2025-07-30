function Delete({ id, onDelete }) {
    return <button onClick={() => onDelete(id)}>Delete</button>;
}
export default Delete