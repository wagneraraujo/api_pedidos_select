const Representante = require("../models/representante.model");
const jwt = require("jsonwebtoken");
const secret = "mysecret";

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
  },

  async login(req, res) {
    const { email, password, name } = req.body;
    Representante.findOne({ email: email, type_user: 1 }, function(err, user) {
      if (err) {
        console.log(err);
        res
          .status(200)
          .json({ erro: "Erro no servidor. Por favor, tente novamente" });
      } else if (!user) {
        res.status(200).json({
          status: 2,
          error: "E-mail não encontrado no banco de dados"
        });
      } else {
        user.isCorrectPassword(password, async function(err, same) {
          if (err) {
            res
              .status(200)
              .json({ error: "Erro no servidor. Por favor, tente novamente" });
          } else if (!same) {
            res.status(200).json({ status: 2, error: "A senha não confere" });
          } else {
            const payload = { email };
            const token = jwt.sign(payload, secret, {
              expiresIn: "24h"
            });
            res.cookie("token", token, { httpOnly: true });
            // res.status(200).json({
            //   status: 1,
            //   auth: true,
            //   token: token,
            //   id_client: id_client
            // });
            res.status(200).json({
              status: 1,
              auth: true,
              token: token,
              id_client: user._id,
              user_name: user.name
            });
          }
        });
      }
    });
  },

  async checktoken(req, res, next) {
    try {
      const token =
        req.body.token ||
        req.query.token ||
        req.cookies.token ||
        req.id_client ||
        req.headers["x-access-token"];
      res.token = token;
      if (!token) {
        res.json({ status: 401, msg: "Não autorizado: Token inexistente!" });
      } else {
        jwt.verify(token, secret, function(err, decoded) {
          if (err) {
            res.json({ status: 401, msg: "Não autorizado: Token inválido!" });
          } else {
            res.json({ status: 200 });
          }
        });
      }

      req.id_client = decoded.id;
      console.log(req.id);
      netx();
    } catch (err) {
      console.log(err);
    }
  }
};
