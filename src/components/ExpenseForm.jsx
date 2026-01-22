import { useEffect, useState } from "react";

const ExpenseForm = ({ onAdd, onUpdate, editingExpense, onCancelEdit }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount);
      setCategory(editingExpense.category);
    }
  }, [editingExpense]);

  function handleSubmit(e) {
    e.preventDefault();
    const expenseData = {
      title,
      amount: Number(amount),
      category,
    };

    if (editingExpense) {
      onUpdate({ ...editingExpense, ...expenseData });
    } else {
      onAdd(expenseData);
    }

    setTitle("");
    setAmount("");
    setCategory("");
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          className="border p-2 w-full"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          className="border p-2 w-full"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          className="border p-2 w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option>Food</option>
          <option>Rent</option>
          <option>Transport</option>
          <option>Shopping</option>
          <option>Utility</option>
          <option>Family Assistant</option>
          <option>Others</option>
        </select>

        <div className="flex gap-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4">
            {editingExpense ? "Update Expense" : "Add Expense"}
          </button>

          {editingExpense && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default ExpenseForm;
