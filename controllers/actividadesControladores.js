const Actividad = require("../models/Actividad");

const actividadesControladores = {
  obtenerActividades: (req, res) => {
    Actividad.find()
      .then((actividades) =>
        res.json({ success: true, respuesta: actividades })
      )
      .catch((err) => res.json({ success: false, respuesta: err }));
  },
  cargarActividades: (req, res) => {
    const actividadAGrabar = new Actividad({
      actividades: req.body.actividades,
    });
    actividadAGrabar
      .save()
      .then(() => res.json({ success: true }))
      .catch((error) => res.json({ success: false, error: error }));
  },
  obtenerActividad: (req, res) => {
    console.log(req.params)
    Actividad.findOne({ _id: req.params.id })
      .then((res) => res.json({ success: true, respuesta: Actividad }))
      .catch((err) => res.json({ success: false, respuesta: err }));
  },
  modificarActividad: (req, res) => {
    Actividad.findOneAndUpdate({ _id: req.params.id }, { ...req.body })
      .then(() => res.json({ success: true }))
      .catch((error) => res.json({ success: false, response: error }));
  },
  borrarActividad: (req, res) => {
    Actividad.findOneAndDelete({ _id: req.params.id })
      .then(() => res.json({ success: true }))
      .catch((error) => res.json({ success: false, error: error }));
  },
  obtenerActivadesPorItinerario: (req, res) => {
    Actividad.find({ itinerarioId: req.params.itinerarioId })
      .then((actividades) =>
        res.json({ success: true, respuesta: actividades })
      )
      .catch((err) => res.json({ success: false, respuesta: err }));
  },
};

module.exports = actividadesControladores;
