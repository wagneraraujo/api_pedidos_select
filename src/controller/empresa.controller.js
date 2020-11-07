const cadastroEmpresa = require("../models/empresas.model");

module.exports = {
  async index(req, res) {
    const empresa = await cadastroEmpresa.find();
    res.json({ empresa });
  },

  async create(req, res) {
    try {
      const {
        razao_social,
        nome_fantasia,
        estado,
        cidade,
        bairro,
        endereco,
        cep,
        cpnj,
        inscricao_estadual,
        qtd_funcionarios,
        email,
        phone,
        endereco_cobranca,
        cidade_cobranca,
        estado_cobranca,
        telefone_cobranca,
        nome_responsavel,
        telefone_responsavel,
        cpf_responsavel,
        email_responsavel,
        agencia,
        conta,
        instituicao,
        favorecido
      } = req.body;
      dataEmpresa = {};
      let check_empresa = await cadastroEmpresa.findOne({ cpnj });
      if (!check_empresa) {
        dataEmpresa = {
          razao_social,
          nome_fantasia,
          estado,
          cidade,
          bairro,
          endereco,
          cep,
          cpnj,
          inscricao_estadual,
          qtd_funcionarios,
          email,
          phone,
          endereco_cobranca,
          cidade_cobranca,
          estado_cobranca,
          telefone_cobranca,
          nome_responsavel,
          telefone_responsavel,
          cpf_responsavel,
          email_responsavel,
          agencia,
          conta,
          instituicao,
          favorecido
        };
        check_empresa = await cadastroEmpresa.create(dataEmpresa);
        return res.status(200).json(check_empresa);
      } else {
        return res.status(500).json(check_empresa);
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
    const {
      _id,
      razao_social,
      nome_fantasia,
      estado,
      cidade,
      bairro,
      endereco,
      cep,
      cpnj,
      inscricao_estadual,
      qtd_funcionarios,
      email,
      phone,
      endereco_cobranca,
      cidade_cobranca,
      estado_cobranca,
      telefone_cobranca,
      nome_responsavel,
      telefone_responsavel,
      cpf_responsavel,
      email_responsavel,
      agencia,
      conta,
      instituicao,
      favorecido
    } = req.body;
    const newData = {
      _id,
      razao_social,
      nome_fantasia,
      estado,
      cidade,
      bairro,
      endereco,
      cep,
      cpnj,
      inscricao_estadual,
      qtd_funcionarios,
      email,
      phone,
      endereco_cobranca,
      cidade_cobranca,
      estado_cobranca,
      telefone_cobranca,
      nome_responsavel,
      telefone_responsavel,
      cpf_responsavel,
      email_responsavel,
      agencia,
      conta,
      instituicao,
      favorecido
    };
    const updateEmpresa = await cadastroEmpresa.findOneAndUpdate(
      { _id },
      newData,
      { new: true }
    );
    res.json(updateEmpresa);
  },

  async delete(req, res) {
    const id = req.params.id;
    const deleteEmpresa = await cadastroEmpresa.findByIdAndRemove(id);
    res.status(500).json({ message: ` excluido com sucesso` });
  }
};
