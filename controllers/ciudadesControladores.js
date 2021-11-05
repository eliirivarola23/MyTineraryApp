const Ciudad = require("../models/Ciudad");

const ciudadesControladores = {
  obtenerCiudades: async (req, res) => {
    try {
      const ciudades = await Ciudad.find()
      if(!ciudades.length) {
        throw new Error()
      } else {
        res.json({ success: true, respuesta: ciudades })
      }
    }
    catch(err) { res.json({ success: false, respuesta: err })}

  },
  cargarNuevaCiudad: (req, res) => {
    const ciudadAGrabar = new Ciudad({
      imagen: req.body.imagen,
      caption: req.body.caption,
      descripcion: req.body.descripcion,
    });
    ciudadAGrabar
      .save()
      .then(() => res.json({ success: true }))
      .catch((error) => res.json({ success: false, error: error }));
  },
  obtenerCiudad: (req, res) => {
    Ciudad.findOne({ _id: req.params.id })
      .then((res) => res.json({ success: true, respuesta: res }))
      .catch((err) => res.json({ success: false, respuesta: err }));
  },
  modificarCiudad: (req, res) => {
    Ciudad.findOneAndUpdate({ _id: req.params.id }, { ...req.body })
      .then(() => res.json({ success: true }))
      .catch((error) => res.json({ success: false, response: error }));
  },
  borrarCiudad: (req, res) => {
    Ciudad.findOneAndDelete({ _id: req.params.id })
      .then(() => res.json({ success: true }))
      .catch((error) => res.json({ success: false, error: error }));
  },
};

module.exports = ciudadesControladores;
