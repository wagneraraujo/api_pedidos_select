const express = require("express");
const routes = express.Router();
const representante = require("./controller/representante.controller");

routes.get("/", (req, res) => {
  res.json({ message: "Olá representante Select Nutri, faca o login" });
});

routes.post("/representante/cadastro", representante.create);

routes.get("/representantes", representante.index);

module.exports = routes;
