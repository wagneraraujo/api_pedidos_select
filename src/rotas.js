const express = require("express");
const routes = express.Router();
const representante = require("./controller/representante.controller");
const product = require("./controller/produto.controller");
const empresa = require("./controller/empresa.controller");
const pedidos = require("./controller/pedidos.controller");

routes.get("/", (req, res) => {
  res.json({ message: "Olá representante Select Nutri, faca o login" });
});

routes.get("/representantes", representante.index);
routes.post("/representante/login/", representante.login);
routes.post("/representante/cadastro", representante.create);
routes.get("/representante/:id", representante.detailsRepresentante);
routes.put("/representante/update/:id", representante.updateRepresentante);
routes.delete("/representante/:id", representante.deleteRepresentante);

routes.get("/representante/checktocken", representante.checktoken);

//products
routes.get("/produtos/", product.index);
routes.post("/produtos/criar", product.create);
routes.get("/produto/:id", product.details);
routes.put("/produto/atualizar", product.update);
routes.delete("/produto/deletar/:id", product.delete);

//empresas
routes.get("/admin/empresas/", empresa.index);
routes.post("/admin/cadastro-empresa/", empresa.create);
routes.put("/admin/empresas/atualizar/", empresa.update);
routes.delete("/admin/empresas/:id/", empresa.delete);

//empresas cadastradas por representantes
routes.post(
  "/admin/representante/:id/cadastrar-empresas",
  representante.cadastrarEmpresa
);

//pedidos
routes.post("/admin/pedidos/criar-pedido", pedidos.create);
routes.get(
  "/admin/representante/:id/pedidos",
  representante.getRepresentantePedidos
);
routes.post(
  "/admin/representante/:id/criar-pedido",
  representante.createPedidosRepresentante
);

module.exports = routes;
