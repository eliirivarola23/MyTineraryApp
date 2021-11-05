const express = require("express");
const router = express.Router();
const ciudadesControladores = require("../controllers/ciudadesControladores");
const itinerariosControladores = require("../controllers/itinerariosControladores");
const usuariosControladores = require("../controllers/usuariosControladores");
const actividadesControladores = require("../controllers/actividadesControladores");
const validador = require("../controllers/validador");
const passport = require("passport");

router
  .route("/cities")
  .get(ciudadesControladores.obtenerCiudades)
  .post(ciudadesControladores.cargarNuevaCiudad);

router
  .route("/city/:id")
  .get(ciudadesControladores.obtenerCiudad)
  .put(ciudadesControladores.modificarCiudad)
  .delete(ciudadesControladores.borrarCiudad);

router
  .route("/itineraries")
  .get(itinerariosControladores.obtenerItinerarios)
  .post(itinerariosControladores.cargarItinerario);

router
  .route("/itinerary/:id")
  .get(itinerariosControladores.obtenerItinerario)
  .delete(itinerariosControladores.borrarItinerario)

router
  .route("/itineraries/:ciudadId")
  .get(itinerariosControladores.obtenerItinerariosPorCiudad);

  router
  .route("/usuarios")
  .post(validador, usuariosControladores.cargarNuevoUsuario);
  router
  .route("/usuario/:usuarioId")
  .get(usuariosControladores.obtenerUsuario)

router.route("/usuario/ingresar").post(usuariosControladores.ingresarCuenta);

router
  .route("/verificarToken")
  .get(
    passport.authenticate("jwt", { session: false }),
    usuariosControladores.verificarToken
  );

router
.route("/actividades")
.get(actividadesControladores.obtenerActividades)
.post(actividadesControladores.cargarActividades)

router.route("/actividad/:id")
.get(actividadesControladores.obtenerActividad)
.put(actividadesControladores.modificarActividad)
.delete(actividadesControladores.borrarActividad)
router
.route("/actividades/:itinerarioId")
.get(actividadesControladores.obtenerActivadesPorItinerario);

router
.route("/itinerary/meGusta/:id")
.put(passport.authenticate("jwt", { session: false }),itinerariosControladores.agregarMeGusta)
router
.route("/itinerary/comentario/:id")
.put(passport.authenticate("jwt", { session: false }),itinerariosControladores.crearComentario)


module.exports = router;
