const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String },
  apellido: { type: String },
  email: { type: String },
  password: { type: String },
  url_foto: { type: String },
  pais: { type: String },
});

const Usuario = mongoose.model("usuario", usuarioSchema);
module.exports = Usuario;
