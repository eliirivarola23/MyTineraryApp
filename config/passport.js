const passport = require("passport");
const estrategiaToken = require("passport-jwt").Strategy;
const extraerToken = require("passport-jwt").ExtractJwt;
const Usuario = require("../models/Usuario");

module.exports = passport.use(
  new estrategiaToken(
    {
      jwtFromRequest: extraerToken.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRETORKEY,
    },
    (payload, done) => {
      Usuario.findOne({ _id: payload._doc._id })
        .then((respuesta) => {
          if (!respuesta) {
            return done(null, false);
          } else {
            return done(null, respuesta);
          }
        })
        .catch((error) => done(error, false));
    }
  )
);
