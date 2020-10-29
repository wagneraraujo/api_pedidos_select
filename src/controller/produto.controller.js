const { findById } = require("../models/produto.model");
const criarProduto = require("../models/produto.model");

module.exports = {
  async index(req, res) {
    const products = await criarProduto.find();
    res.json({ Product });
  },

  async create(req, res) {
    try {
      const { name_product, description, price, qtd } = req.body;
      dataProduct = {};
      let check_product = await criarProduto.findOne({ name_product });
      if (!check_product) {
        dataProduct = { name_product, description, price, qtd };
        check_product = await criarProduto.create(dataProduct);
        return res.status(200).json(check_product);
      } else {
        return res.status(500).json(check_product);
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
