import React, { useContext } from "react";
import { v4 as uuid } from "uuid";
import useLocalStorage from "./useLocalStorage";

const BudgetContext = React.createContext();

export const BudgetProvider = ({ children }) => {
  const [budget, setBudget] = useLocalStorage("Budgets", []);
  const [expenses, setExpenses] = useLocalStorage("Expenses", []);

  // Budget
  const addBudget = ({ budgetName, totalAmount }) => {
    setBudget((prevBudgets) => {
      if (prevBudgets.find((budget) => budget.budgetName === budgetName)) {
        return prevBudgets;
      }
      return [
        ...prevBudgets,
        {
          id: uuid(),
          budgetName,
          totalAmount,
        },
      ];
    });
  };

  const deleteBudget = (budgetId) => {
    const expensesList = expenses.filter((data) => data.budgetId !== budgetId);
    setExpenses(expensesList);
    let budgetList = budget.filter((data) => data.id !== budgetId);
    setBudget(budgetList);
  };

  //Expenses

  const addExpenses = ({ item, amount, budgetId }) => {
    return setExpenses((prevExpenses) => {
      const expenseItem = prevExpenses.find(
        (expense) => expense.item === item && budgetId === budgetId
      );
      if (expenseItem) {
        return prevExpenses.map((expense) => {
          if (expense.id === expenseItem.id) {
            expense.amount = amount;
            return expense;
          }

          return expense;
        });
      } else {
        return [
          ...prevExpenses,
          {
            id: uuid(),
            budgetId,
            item,
            amount,
          },
        ];
      }
    });
  };

  const getBudgetExpenses = (budgetId) => {
    let budgetExpenseItems = expenses.filter(
      (data) => data.budgetId === budgetId
    );
    return budgetExpenseItems;
  };

  const deleteExpenses = (expensesId) => {
    const expensesList = expenses.filter((data) => data.id !== expensesId);
    setExpenses(expensesList);
  };

  return (
    <BudgetContext.Provider
      value={{
        budget,
        expenses,
        getBudgetExpenses,
        addBudget,
        addExpenses,
        deleteExpenses,
        deleteBudget,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => {
  return useContext(BudgetContext);
};
