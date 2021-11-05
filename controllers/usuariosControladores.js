const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const usuariosControladores = {
  cargarNuevoUsuario: async (req, res) => {
    console.log("entre " + req.body)
    const { nombre, apellido, email, password, url_foto, pais } =
      req.body;
    let hashedPass = bcryptjs.hashSync(password);
    const usuarioAGrabar = new Usuario({
      nombre,
      apellido,
      email,
      password: hashedPass,
      url_foto,
      pais,
    });
    try {
      let usuarioExiste = await Usuario.findOne({ email: email });
      if (usuarioExiste) throw new Error("Username already in use");
      await usuarioAGrabar.save();
      const token = jwt.sign({ ...usuarioAGrabar }, process.env.SECRETORKEY);
      res.json({
        success: true,
        respuesta: {
          nombre: usuarioAGrabar.nombre,
          url_foto: usuarioAGrabar.url_foto,
          token,
        },
      });
    } catch (e) {
      res.json({ success: false, respuesta: e.message });
    }
  },
  obtenerUsuario: async (req, res) => {
    try {
      var usuario = await Usuario.findOne({ _id: req.params.usuarioId });
      if (usuario) {
        res.json({ success: true, respuesta: usuario });
      } else {
        res.json({ success: false, respuesta: err });
      }
    } catch (err) {
      res.json({ success: false, respuesta: err });
    }
  },
  ingresarCuenta: async (req, res) => {
    const { email, password } = req.body;
    try {
      let usuarioExiste = await Usuario.findOne({ email: email });
      if (!usuarioExiste)
        throw new Error("You do not have a My Itinerary account. Sign up!");
      let claveCorrecta = bcryptjs.compareSync(
        password,
        usuarioExiste.password
      );
      if (!claveCorrecta) throw new Error("Username and/or password incorrect");
      const token = jwt.sign({ ...usuarioExiste }, process.env.SECRETORKEY);
      res.json({
        success: true,
        respuesta: {
          nombre: usuarioExiste.nombre,
          url_foto: usuarioExiste.url_foto,
          token,
        },
      });
    } catch (e) {
      res.json({ success: false, respuesta: e.message });
    }
  },
  verificarToken: (req, res) => {
    res.json({ nombre: req.user.nombre, url_foto: req.user.url_foto, _id: req.user._id, apellido: req.user.apellido });
  },
};

module.exports = usuariosControladores;
