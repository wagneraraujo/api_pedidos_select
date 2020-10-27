const Representante = require("../models/representante.model");

module.exports = {
  index(req, res) {
    res.json({ message: "ola " });
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
  }
};

//module.exports = {
//  index(req, res) {
//    res.json({ message: "cadastro de representante" });
//  },

//  //async create(req, res) {
//  //  const {
//  //    name,
//  //    last_name,
//  //    cpf_cpnj,
//  //    email,
//  //    phone,
//  //    state,
//  //    city,
//  //    password,
//  //    type_user
//  //  } = req.body;

//  //  let dados_representantes = {};

//  //  //verificar se email ja existe
//  //  let email_user = await Representante.findOne({ email });

//  //  if (!email_user) {
//  //    dados_representantes = {
//  //      name,
//  //      last_name,
//  //      cpf_cpnj,
//  //      email,
//  //      phone,
//  //      state,
//  //      city,
//  //      password,
//  //      type_user
//  //    };
//  //    email_user = await Representante.create(dados_representantes);
//  //    return res.status(200).json(email_user);
//  //  } else {
//  //    return res.status(500).json(email_user);
//  //  }
//  //}

//};
//
