import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import useExpense from "./hooks/useExpense";

const App = () => {
  const {
    expenses,
    totalAmount,
    filter,
    editingExpense,
    isEditing,
    addExpense,
    updateExpense,
    deleteExpense,
    startEdit,
    cancelEdit,
    setFilter,
  } = useExpense();

  return (
    <div className="p-4">
      <h1>Expense Tracker</h1>
      <ExpenseForm
        onAdd={addExpense}
        onUpdate={updateExpense}
        editingExpense={editingExpense}
        onCancelEdit={cancelEdit}
      />
      <select
        className="border p-2 my-4"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option>All</option>
        <option>Food</option>
        <option>Rent</option>
        <option>Transport</option>
        <option>Shopping</option>
        <option>Utility</option>
        <option>Family Assistant</option>
        <option>Others</option>
      </select>
      <p className="text-lg font-semibold mb-4">Total: ${totalAmount}</p>
      <ExpenseList
        expenses={expenses}
        onDelete={deleteExpense}
        onStartEdit={startEdit}
        isEditing={isEditing}
      />
      {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
    </div>
  );
};

export default App;
