const ExpenseList = ({ expenses, onDelete, onStartEdit, isEditing }) => {
  if (expenses.length === 0) {
    return (
      <div className="text-center text-grey-500 py-8">
        <p className="font-medium">No expenses found.</p>
        <p className="text-sm">Add your first expense to get started</p>
      </div>
    );
  }
  return (
    <>
      <ul className="space-y-2">
        {expenses.map((expense) => (
          <li
            key={expense.id}
            className="flex justify-between item-center border p-3 rounded"
          >
            <div>
              <p className="font-medium">{expense.title}</p>
              <p className="text-sm text-gray-500">
                {expense.category} . ${expense.amount}
              </p>
            </div>
            <div className="space-x-2">
              <button
                className="text-blue-600 text-sm disabled:text-gray-400"
                disabled={!!isEditing}
                onClick={() => onStartEdit(expense.id)}
              >
                Edit
              </button>
              <button
                className="text-red-600 text-sm"
                onClick={() => onDelete(expense.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
export default ExpenseList;
