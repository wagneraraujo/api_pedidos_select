const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema(
  {
    pedido_para: String,
    numeropedido: { type: Number, default: Date.now },
    criado: { type: mongoose.Schema.Types.ObjectId, ref: "representante" },
    // products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    // empresas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Empresa" }],
    statuspedido: { type: String }
  },
  {
    timestamps: true
  }
);

const criarPedido = mongoose.model("Pedidos", DataSchema);
module.exports = criarPedido;
