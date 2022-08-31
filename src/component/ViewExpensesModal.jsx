import React from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { currencyFormat } from "../util/CurrencyConversion";
import { useBudget } from "../context/BudgetContext";

export default function ViewExpensesModal({
  budget,
  viewExpense,
  handleViewExpenseClose,
}) {
  const { getBudgetExpenses, deleteExpenses } = useBudget();
  let expenses = null;
  const handleDelete = (expensesId) => {
    deleteExpenses(expensesId);
  };

  expenses = getBudgetExpenses(budget.id);
  return (
    <Modal show={viewExpense} onHide={handleViewExpenseClose}>
      <Modal.Header closeButton>
        <Modal.Title>{budget.budgetName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {expenses.length === 0 && (
          <p className='text-center'>No Items Found </p>
        )}

        {expenses.map((data) => (
          <div
            key={data.id}
            className='d-flex  justify-content-between align-items-center mb-3'
          >
            <div>
              <p>{data.item}</p>
            </div>

            <div className='d-flex align-items-center'>
              <p>{currencyFormat.format(data.amount)}</p>

              <Button
                variant='danger'
                size='sm'
                className='ms-3 w-10 rounded-circle'
                onClick={() => handleDelete(data.id)}
              >
                X
              </Button>
            </div>
          </div>
        ))}
      </Modal.Body>
    </Modal>
  );
}
