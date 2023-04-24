const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "crud-games",
});

app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
  const { name } = req.body; /* mesma coisa disso => const name = req.body.name*/
  const { price } = req.body;
  const { category } = req.body;

  let SQL = "INSERT INTO games (name, price, category) VALUES (?, ?, ?)";

  db.query(SQL, [name, price, category], (err, result) => {
    err ? console.log(err) : res.send(result);
  });
});

app.get("/getCards", (req, res) => {
  let SQL = "SELECT * FROM games";

  db.query(SQL, (err, result) => {
    err ? console.log(err) : res.send(result);
  });
});

app.put("/edit", (req, res) => {
  const { id, name, price, category } = req.body;

  let SQL =
    "UPDATE games SET name = ?, price = ?, category = ? WHERE idgames = ?";

  db.query(SQL, [name, price, category, id], (err, result) => {
    err ? console.log(err) : res.send(result);
  });
});

app.delete("/delete/:id", (req, res) => {
    const {id} = req.params;
    let SQL = "DELETE FROM games WHERE idgames = ?";
    db.query(SQL, [id], (err, result) => {
        err ? console.log(err) : res.send(result);
    })
});

app.listen(3001, () => {
  console.log("rodando servidor");
});
