import React from "react";
import Card from "react-bootstrap/Card";
import "./cards.css";
import FormDialog from "../dialog/dialog";

export default function Cards(props) {
  const [show, setShow] = React.useState(false);

  const handleClickCard = () => {
    setShow(true)
  }

  return (
    <>
    
      <FormDialog 
        show={show} 
        setShow={setShow} 
        id={props.id}
        name={props.name} 
        price={props.price} 
        category={props.category}
        listCard={props.listCard}
        setListCard={props.setListCard}
      />
      <Card border="dark" style={{ width: "18rem" }} className="mt-3 d-flex"
      onClick={() => handleClickCard()}
      >
        <Card.Header>
          <Card.Title>{props.name}</Card.Title>
        </Card.Header>
        <Card.Body>
          
          <Card.Text>Preço: {props.price}</Card.Text>
          <Card.Text>Preço: {props.category}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
