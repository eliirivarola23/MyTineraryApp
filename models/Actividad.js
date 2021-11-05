const mongoose = require("mongoose");

const actividadSchema = new mongoose.Schema({
  actividades: { type: Array, required: true },
  itinerarioId: { type: mongoose.Types.ObjectId, ref: "itinerario" },
});

const Actividad = mongoose.model("actividad", actividadSchema);
module.exports = Actividad;
