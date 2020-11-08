// const mongoose = require("mongoose");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const DataSchema = new mongoose.Schema(
  {
    name: String,
    last_name: String,
    cpf_cpnj: { type: Number },
    email: String,
    phone: { type: Number },
    state: String,
    city: String,
    password: String,
    type_user: { type: Number, default: 1 },

    criarpedidos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pedidos"
      }
    ],
    criarempresa: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Empresa"
      }
    ]
  },
  {
    timestamps: true
  }
);

// DataSchema.pre("save", function(next) {
//   if (!this.isModified("password")) {
//     return next();
//   }

//   this.password = bcrypt.hashSync(this.password, 10);
//   next();
// });

DataSchema.pre("save", async function(next) {
  const saltRounds = 10;

  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, saltRounds);
});

DataSchema.pre("findOneAndUpdate", function(next) {
  let senha = this.getUpdate().password + "";
  if (senha.length < 50) {
    this.getUpdate().password = bcrypt.hashSync(senha, 10);
  }
  next();
});

DataSchema.methods.isCorrectPassword = function(password, callback) {
  try {
    bcrypt.compare(password, this.password, function(err, same) {
      if (err) {
        callback(err);
      } else {
        callback(err, same);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const contaRepresentante = mongoose.model("Representantes", DataSchema);
module.exports = contaRepresentante;
