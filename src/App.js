import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import Cards from "./components/cards/cards";

function App() {
  const [values, setValues] = useState();
  const [listGames, setListGames] = useState();
  

  console.log(listGames);
  const handleChangeValues = (v) => {
    setValues((prevValue) => ({
      ...prevValue,
      [v.target.name]: v.target.value,
    }));
  };
  const handleClickButton = () => {
    Axios.post("http://localhost:3001/register", {
      name: values.name,
      price: values.price,
      category: values.category,
    }).then((response) => {
      console.log(response);
    });
    document.location.reload();
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getCards")
      .then((response) => {
        setListGames(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  


  return (
    <div className="d-flex flex-column align-items-center app--container">
      <div
        className="w-30 mt-3
       register--container"
      >
        <Form className="border border-4 border-dark p-4">
          <h1>Scrim Shop</h1>

          <Form.Control
            aria-label="Nome do produto"
            name="name"
            placeholder="Nome"
            className="mb-3"
            onChange={handleChangeValues}
          />

          <Form.Control
            aria-label="Preço do produto"
            name="price"
            placeholder="Preço"
            className="mb-3"
            onChange={handleChangeValues}
          />

          <Form.Control
            aria-label="Categoria do produto"
            name="category"
            placeholder="Categoria"
            className="mb-3"
            onChange={handleChangeValues}
          />
          <Button
            variant="outline-primary"
            className="w-20"
            onClick={handleClickButton}
          >
            Cadastrar
          </Button>
        </Form>
      </div>
      
      { typeof listGames != "undefined" && listGames.map((value) => {
        return (
        <Cards
          key = { value.id }
          listCard= { listGames }
          setListCard = { setListGames }
          id={ value.idgames } 
          name={ value.name }
          price={ value.price }
          category={ value.category }
        />
        )
      })}
    </div>
  );
}

export default App;
