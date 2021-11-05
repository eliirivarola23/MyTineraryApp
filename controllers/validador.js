const joi = require("joi");

const validador = (req, res, next) => {
  const schema = joi.object({
    nombre: joi
      .string()
      .trim()
      .min(2)
      .max(15)
      .required()
      .messages({ "string.min": "The name must contain at least 2 letters" }),
    apellido: joi.string().trim().min(2).max(15).required().messages({
      "string.empty": "The last name field must not contain numbers.",
      "string.min": "The Last name must contain at least 2 letters",
    }),
    email: joi
      .string()
      .email()
      .required()
      .messages({ "string.email": "Please write a valid email" }),
    password: joi.string().trim().required().min(5).messages({
      "string.empty": " Password must contain at least 5 characters",
      "string.min": "The password must contain at least 5 letters",
    }),
    url_foto: joi
      .required()
      .messages({ "string.empty": "You must use a valid url" }),
    pais: joi.required(),
    google: joi.boolean(),
  });
  const validacion = schema.validate(req.body, { abortEarly: false });
  if (!validacion.error) {
    next();
  } else {
    res.json({ success: false, respuesta: validacion.error.details });
  }
};

module.exports = validador;
