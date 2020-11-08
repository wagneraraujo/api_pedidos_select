const criarPedido = require("../models/pedidos.model");

module.exports = {
  async index(req, res) {
    const pedido = await criarPedido.find();
    res.json(pedido);
  },

  async create(req, res) {
    try {
      const { pedido } = req.body;
      datapedido = {};
      let check_pedido = await criarPedido.findOne({ pedido });
      if (!check_pedido) {
        datapedido = { pedido };
        check_pedido = await criarPedido.create(datapedido);
        return res.status(200).json(check_pedido);
      } else {
        return res.status(500).json(check_pedido);
      }
    } catch (err) {
      return res.status(500).json({ message: err + "algo errado" });
    }
  },

  async details(req, res) {
    const id = req.params.id;
    try {
      const productId = await criarProduto.findById(id);
      res.json(productId);
    } catch (err) {
      res
        .status(500)
        .json({ message: `Error: ${err}, produto nao encontrado` });
    }
  },

  async update(req, res) {
    const { _id, name_product, description, price, qtd } = req.body;
    const newData = { _id, name_product, description, price, qtd };
    const updateProduct = await criarProduto.findOneAndUpdate(
      { _id },
      newData,
      { new: true }
    );
    res.json(updateProduct);
  },

  async delete(req, res) {
    const id = req.params.id;
    const deleteProduct = await criarProduto.findByIdAndRemove(id);
    res.status(500).json({ message: ` excluido com sucesso` });
  }
};
