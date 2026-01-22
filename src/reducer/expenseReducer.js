export const initialState = {
  expenses: [],
  filter: "All",
  editingExpenseId: null,
};

const expenseReducer = (state, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };

    case "DELETE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload,
        ),
      };

    case "UPDATE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.id ? action.payload : expense,
        ),
        editingExpenseId: null,
      };
    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };
    case "START_EDIT":
      return {
        ...state,
        editingExpenseId: action.payload,
      };
    case "CANCEL_EDIT":
      return {
        ...state,
        editingExpenseId: null,
      };

    default:
      return state;
  }
};

export default expenseReducer;
