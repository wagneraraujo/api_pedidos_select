const Representante = require("../models/representante.model");

module.exports = {
  async index(req, res) {
    const representantes = await Representante.find();
    res.json({ representantes });
  },
  async create(req, res) {
    const {
      name,
      last_name,
      cpf_cpnj,
      email,
      phone,
      state,
      city,
      password,
      type_user
    } = req.body;

    let dados_representantes = {};

    //verificar se ja existe
    let verificar_email = await Representante.findOne({ email });

    if (!verificar_email) {
      dados_representantes = {
        name,
        last_name,
        cpf_cpnj,
        email,
        phone,
        state,
        city,
        password,
        type_user
      };

      verificar_email = await Representante.create(dados_representantes);
      return res.status(200).json(verificar_email);
    } else {
      return res.status(500).json(verificar_email);
    }
  },

  async detailsRepresentante(req, res) {
    const id = req.params.id;
    const representanteId = await Representante.findById(id);
    res.json(representanteId);
  },

  async updateRepresentante(req, res) {
    const {
      _id,
      name,
      last_name,
      cpf_cpnj,
      email,
      phone,
      state,
      city,
      password,
      type_user
    } = req.body;
    const newData = {
      _id,
      name,
      last_name,
      cpf_cpnj,
      email,
      phone,
      state,
      city,
      password,
      type_user
    };

    const repre = await Representante.findOneAndUpdate({ _id }, newData, {
      new: true
    });
    res.json(repre);
  },

  async deleteRepresentante(req, res) {
    const id = req.params.id;
    const remove = await Representante.findByIdAndDelete(id);
    res.json({ message: "Sua conta foi excluida com sucesso" });
  }
};
