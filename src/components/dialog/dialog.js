import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Axios from 'axios';


export default function FormDialog(props) {
  /*const handleShow = () => {
    props.setShow(true);
  };
  */
  const [editValues, setEditValues] = useState({
    id: props.id,
    name: props.name,
    price: props.price,
    category: props.category,
  });

  const handleEditGame = () => {
    Axios.put("http://localhost:3001/edit", {
      id: editValues.id,
      name: editValues.name,
      price: editValues.price,
      category: editValues.category,
    });
    handleClose();
    document.location.reload();
  }

  const handleDelete = () => {
    Axios.delete(`http://localhost:3001/delete/${editValues.id}`);
    handleClose();
    document.location.reload();
  }

  const handleClose = () => {
    props.setShow(false);
  };

  const handleChangeValues = (value) => {
    setEditValues(prevValues=>({
      ...prevValues,
      [value.target.id]: value.target.value
    }));
  }

  return (
      <Modal 
        centered="true"
        size="lg"
        show={props.show} 
        id={props.id}
      >
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>Editar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Control                
                placeholder="Nome do jogo"
                defaultValue={props.name}
                type="text"
                onChange={handleChangeValues}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="price">
              <Form.Control      
                placeholder="Preço"
                defaultValue={props.price}
                type="text"      
                onChange={handleChangeValues}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="category">
              <Form.Control
                placeholder="Categoria"
                defaultValue={props.category}
                type="text"                
                onChange={handleChangeValues}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleDelete}>
            Excluir
          </Button>
          <Button variant="primary" onClick={handleEditGame}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
  );
}
