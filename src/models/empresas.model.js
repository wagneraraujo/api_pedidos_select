// const mongoose = require("mongoose");
const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema(
  {
    representante_criador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "representante"
    },
    razao_social: String,
    nome_fantasia: String,
    estado: String,
    cidade: String,
    bairro: String,
    endereco: String,
    cep: { type: Number, required: true },
    cpnj: { type: Number, required: true },
    inscricao_estadual: String,
    qtd_funcionarios: Number,
    email: String,
    phone: { type: Number },
    //endereco combranca
    endereco_cobranca: String,
    cidade_cobranca: String,
    estado_cobranca: String,
    telefone_cobranca: Number,

    //dados responsavel
    nome_responsavel: String,
    telefone_responsavel: Number,
    cpf_responsavel: Number,
    email_responsavel: String,

    //dados bancarios
    agencia: String,
    conta: String,
    instituicao: String,
    favorecido: String
  },
  {
    timestamps: true
  }
);

const cadastroEmpresa = mongoose.model("Empresa", DataSchema);
module.exports = cadastroEmpresa;
