const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema(
  {
    name_product: String,
    description: String,
    price: { type: Number, default: 0 },
    qtd: Number
  },
  {
    timestamps: true
  }
);

const criarProduto = mongoose.model("Product", DataSchema);
module.exports = criarProduto;
