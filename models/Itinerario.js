const mongoose = require("mongoose");

const ItinerarioSchema = new mongoose.Schema({
  foto: { type: Array, required: true },
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  creador: { type: Object, required: true },
  precio: { type: Number, required: true },
  duracion: { type: Number, required: true },
  meGustaNumeros: { type: Number, default: 0},
  meGusta: [String],
  numeral: { type: Array, required: true, min: 1, max: 5 },
  comentarios: [{comentario: {type: String}, usuarioId: { type: mongoose.Types.ObjectId, ref: "usuario"}, usuarioFoto: {type: String},usuarioNombre: {type: String},}],
  usuarioId: { type: mongoose.Types.ObjectId, ref: "usuario"},
  ciudadId: { type: mongoose.Types.ObjectId, ref: "ciudad"}
});

const Itinerario = mongoose.model("itinerario", ItinerarioSchema);
module.exports = Itinerario;



