import React, { useState } from "react";
import Model from "./Model";
import { currencyFormat } from "../util/CurrencyConversion";
import ViewExpensesModal from "./ViewExpensesModal";
import { useBudget } from "../context/BudgetContext";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Card } from "react-bootstrap";
import { MdAddCircle } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./BudgetSection.css";

export default function Budgetsection({ budget, spendAmt, grey }) {
  let { id, budgetName, totalAmount } = budget;
  const { deleteBudget, addExpenses } = useBudget();
  const [show, setShow] = useState();
  const [viewExpense, setViewExpense] = useState();

  let classNames = [];
  if (spendAmt > totalAmount) {
    classNames.push("bg-danger", "bg-opacity-10");
  } else if (grey) {
    classNames.push("bg-light");
  }
  const getProgessVarientColor = (spendAmt, totalAmt) => {
    let ratio = spendAmt / totalAmt;
    if (ratio < 0.5) return "primary";
    else if (ratio < 0.75) return "warning";
    return "danger";
  };

  const handleDeleteBudget = (budgetId) => {
    deleteBudget(budgetId);
  };

  const handleSubmit = (event, expense) => {
    event.preventDefault();
    addExpenses({
      item: expense.name,
      amount: expense.amount,
      budgetId: id,
    });
    setShow(false);
  };
  return (
    <div>
      <Card className={`${classNames.join(" ")} mt-2`}>
        <Card.Body>
          <Card.Title className='d-flex justify-content-between fw-normal'>
            <div>{budgetName}</div>
            <span className='fs-5'>
              {currencyFormat.format(spendAmt)}
              <span className='text-muted fs-6'>
                / {currencyFormat.format(totalAmount)}
              </span>
            </span>
          </Card.Title>

          <ProgressBar
            className=' rounded-pill my-3'
            variant={getProgessVarientColor(spendAmt, totalAmount)}
            min={0}
            now={spendAmt}
            max={totalAmount}
          />
          <div className='d-flex justify-content-around'>
            <div className='btn-section'>
              <MdAddCircle
                className='icon-btn add'
                title='Add Expense'
                onClick={() => setShow(true)}
              />
            </div>

            <div className='btn-section'>
              <FaClipboardList
                className='icon-btn'
                title='View Expense'
                onClick={() => setViewExpense(true)}
              />
            </div>
            <div className='btn-section'>
              <RiDeleteBin6Line
                className='icon-btn remove'
                title='Remove'
                onClick={() => handleDeleteBudget(budget.id)}
              />
            </div>
          </div>
        </Card.Body>
      </Card>

      <Model
        show={show}
        handleClose={() => setShow(false)}
        modelDescription={{
          title: budgetName,
          placeholder: "Enter expense name",
          buttonText: "Add Expense",
        }}
        handleSubmit={handleSubmit}
      />
      <ViewExpensesModal
        viewExpense={viewExpense}
        budget={budget}
        handleViewExpenseClose={() => setViewExpense(false)}
      />
    </div>
  );
}
