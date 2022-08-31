import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { currencyFormat } from "../util/CurrencyConversion";
import Card from "react-bootstrap/Card";
import { useBudget } from "../context/BudgetContext";
export default function TotalSection() {
  const { budget, expenses } = useBudget();
  const expenseAmt = expenses.reduce((a, b) => a + b.amount, 0);
  const budgetAmt = budget.reduce((a, b) => a + b.totalAmount, 0);
  const getProgessVarientColor = (spendAmt, totalAmt) => {
    if (totalAmt === 0) return "info";
    let ratio = spendAmt / totalAmt;
    if (ratio < 0.5) return "primary";
    else if (ratio < 0.75) return "warning";

    return "danger";
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title className='d-flex justify-content-between fw-normal'>
          <div>Total Spend </div>
          <span className='fs-5'>
            {currencyFormat.format(expenseAmt)}
            <span className='text-muted fs-6'>
              / {currencyFormat.format(budgetAmt)}
            </span>
          </span>
        </Card.Title>
        <ProgressBar
          className=' rounded-pill my-3'
          variant={getProgessVarientColor(expenseAmt, budgetAmt)}
          min={0}
          now={expenseAmt}
          max={budgetAmt}
        />
      </Card.Body>
    </Card>
  );
}
