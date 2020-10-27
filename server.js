const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const routes = require("./src/rotas");

const app = express();

const port = process.env.PORT || 5050;
app.use(cors());

mongoose.connect("mongodb://localhost:27017/select", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set("useCreateIndex", true);

app.use(cookieParser());
app.use(express.json());
app.use(routes);

app.listen(port, function() {
  console.log(`servidor online na porta ${port}`);
});
