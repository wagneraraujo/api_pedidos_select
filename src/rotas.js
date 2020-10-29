const express = require("express");
const routes = express.Router();
const representante = require("./controller/representante.controller");
const product = require("./controller/produto.controller");
routes.get("/", (req, res) => {
  res.json({ message: "Olá representante Select Nutri, faca o login" });
});

routes.post("/representante/cadastro", representante.create);

routes.get("/representantes", representante.index);
routes.get("/representante/:id", representante.detailsRepresentante);
routes.put("/representante/:id", representante.updateRepresentante);
routes.delete("/representante/:id", representante.deleteRepresentante);

//products
routes.post("/produtos/criar", product.create);
routes.get("/produto/:id", product.details);
routes.put("/produto/atualizar", product.update);
routes.delete("/produto/deletar/:id", product.delete);
module.exports = routes;
