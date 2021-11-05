const Itinerario = require("../models/Itinerario");

const itinerariosControladores = {
  obtenerItinerarios: (req, res) => {
    Itinerario.find()
      .then((itinerarios) =>
        res.json({ success: true, respuesta: itinerarios })
      )
      .catch((err) => res.json({ success: false, respuesta: err }));
  },
  cargarItinerario: (req, res) => {
    const itinerarioAGrabar = new Itinerario({
      foto: req.body.foto,
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      creador: req.body.creador,
      precio: req.body.precio,
      duracion: req.body.duracion,
      meGusta: req.body.meGusta,
      numeral: req.body.numeral,
      comentarios: req.body.comentarios,
    });
    itinerarioAGrabar
      .save()
      .then(() => res.json({ success: true }))
      .catch((error) => res.json({ success: false, error: error }));
  },
  obtenerItinerario: async (req, res) => {
    console.log(req.params)
    try {
      var itinerario = await Itinerario.findOne({ _id: req.params.id });
      if (itinerario) {
        res.json({ success: true, respuesta: itinerario });
      } else {
        res.json({ success: false, respuesta: err });
      }
    } catch (err) {
      res.json({ success: false, respuesta: err });
    }
  },
  modificarItinerario: (req, res) => {
    Itinerario.findOneAndUpdate({ _id: req.params.id }, { ...req.body })
      .then(() => res.json({ success: true }))
      .catch((error) => res.json({ success: false, response: error }));
  },
  borrarItinerario: (req, res) => {
    Itinerario.findOneAndDelete({ _id: req.params.id })
      .then(() => res.json({ success: true }))
      .catch((error) => res.json({ success: false, error: error }));
  },
  obtenerItinerariosPorCiudad: (req, res) => {
    Itinerario.find({ ciudadId: req.params.ciudadId })
      .then((itinerarios) =>
        res.json({ success: true, respuesta: itinerarios })
      )
      .catch((err) => res.json({ success: false, respuesta: err }));
  },

  agregarMeGusta: async (req, res) => {
    try {
      let itinerario = await Itinerario.findOne({ _id: req.params.id });

      if (!itinerario.meGusta.includes(req.user._id)) {
        let nuevoMeGusta = await Itinerario.findOneAndUpdate(
          { _id: req.params.id },
          { $push: { meGusta: req.user._id } },
          { new: true }
        );
        res.json({ success: true, respuesta: nuevoMeGusta.meGusta });
      } else {
        let noMeGusta = await Itinerario.findOneAndUpdate(
          { _id: req.params.id },
          { $pull: { meGusta: req.user._id } },
          { new: true }
        );
        res.json({ success: true, respuesta: noMeGusta.meGusta });
      }
    } catch (e) {
      res.json({ success: false, respuesta: e });
    }
  },

  crearComentario: async (req, res) => {
    // let itinerario = await Itinerario.findOne({ _id: req.body.id });
    try {
      if(!req.body.id) {
        let resp = await Itinerario.findOneAndUpdate(
          { _id: req.params.id },
          { $push: { comentarios: req.body.comentarios}},
          { new: true }
          )
          res.json({ success: true, respuesta: resp.comentarios });
      } else {
        let resp = await Itinerario.findOneAndUpdate(
          { _id: req.params.id },
          { $pull: { comentarios: req.body.comentarios} }
          )
          res.json({ success: true, respuesta: resp });
      }
      } catch (err) {
      res.json({ success: false, respuesta: err });
    }
  },
};

module.exports = itinerariosControladores;
