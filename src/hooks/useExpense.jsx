import { useEffect, useMemo, useReducer } from "react";
import expenseReducer, { initialState } from "../reducer/expenseReducer";

const useExpense = () => {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  useEffect(() => {
    const saved = localStorage.getItem("expenses");
    if (saved) {
      const parsed = JSON.parse(saved);
      parsed.forEach((expense) => {
        dispatch({
          type: "ADD_EXPENSE",
          payload: expense,
        });
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(state.expenses));
  }, [state.expenses]);

  const isEditing = state.editingExpenseId !== null;

  const filteredExpenses = useMemo(() => {
    if (state.filter === "All") return state.expenses;
    return state.expenses.filter(
      (expense) => expense.category === state.filter,
    );
  }, [state.expenses, state.filter]);

  const totalAmount = useMemo(() => {
    return filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [filteredExpenses]);

  function addExpense(expense) {
    dispatch({
      type: "ADD_EXPENSE",
      payload: { ...expense, id: crypto.randomUUID() },
    });
  }

  function updateExpense(expense) {
    dispatch({
      type: "UPDATE_EXPENSE",
      payload: expense,
    });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE_EXPENSE", payload: id });
  }

  function startEdit(id) {
    dispatch({ type: "START_EDIT", payload: id });
  }

  function cancelEdit() {
    dispatch({ type: "CANCEL_EDIT" });
    dispatch({ type: "SET_FILTER", payload: "All" });
  }

  function setFilter(filter) {
    dispatch({
      type: "SET_FILTER",
      payload: filter,
    });
  }

  const editingExpense = state.expenses.find(
    (e) => e.id === state.editingExpenseId,
  );
  return {
    expenses: filteredExpenses,
    totalAmount,
    filter: state.filter,
    editingExpense,
    isEditing,
    addExpense,
    updateExpense,
    deleteExpense,
    startEdit,
    cancelEdit,
    setFilter,
  };
};

export default useExpense;
