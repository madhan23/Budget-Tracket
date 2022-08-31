import React, { useState } from "react";
import Model from "./Model";
import { Button } from "react-bootstrap";
import { Container, Navbar } from "react-bootstrap";
import { useBudget } from "../context/BudgetContext";
export default function Header() {
  const [show, setShow] = useState();
  const handleShow = () => setShow(true);
  const { addBudget } = useBudget();
  const handleSubmit = (event, budget) => {
    event.preventDefault();
    addBudget({
      budgetName: budget.name,
      totalAmount: budget.amount,
    });
    setShow(false);
  };

  return (
    <Navbar expand='md' variant='light' bg='light'>
      <Container className='d-flex align-items-center justify-items-center'>
        <div className='d-flex align-items-center'>
          <img
            style={{ width: "50px", height: "50px" }}
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt='Expense'
          />
          <h5 style={{ color: "#6c757d", margin: "10px", fontWeight: "700" }}>
            Tracker
          </h5>
        </div>

        <Button variant='secondary' onClick={handleShow}>
          Add Budget
        </Button>
        <Model
          show={show}
          handleClose={() => setShow(false)}
          modelDescription={{
            title: "Budget",
            label: "Budget Description",
            placeholder: "Enter Budget Name",
            buttonText: "Add Budget",
          }}
          handleSubmit={handleSubmit}
        />
      </Container>
    </Navbar>
  );
}
