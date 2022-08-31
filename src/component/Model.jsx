import React, { useRef } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const Model = ({ show, handleClose, modelDescription, handleSubmit }) => {
  const name = useRef();
  const amount = useRef();
  const { title, placeholder, buttonText } = modelDescription;
  return (
    <Modal show={show} onHide={handleClose}>
      <Form
        onSubmit={(event) =>
          handleSubmit(event, {
            name: name.current.value,
            amount: parseFloat(amount.current.value),
          })
        }
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className='mb-3'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type='text'
              placeholder={placeholder}
              ref={name}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type='number'
              ref={amount}
              min={0}
              placeholder='Enter amount'
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type='submit' variant='primary'>
            {buttonText}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default Model;
