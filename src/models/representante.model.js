// const mongoose = require("mongoose");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const DataSchema = new mongoose.Schema(
  {
    name: String,
    last_name: String,
    cpf_cpnj: { type: Number, required: true, unique: true },
    email: String,
    phone: { type: Number, required: true },
    state: String,
    city: String,
    password: String,
    type_user: { type: Number, default: 1 }
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

const contaRepresentante = mongoose.model("Representantes", DataSchema);
module.exports = contaRepresentante;
