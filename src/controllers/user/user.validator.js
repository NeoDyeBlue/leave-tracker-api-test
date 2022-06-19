const Joi = require("joi");
const { errorResponse } = require("../../utils");

function register(req, res, next) {
  console.log(req.body);
  const schema = Joi.object({
    fullName: Joi.string()
      .regex(new RegExp(/^(?![\s.]+$)[a-zA-Z\s.]*$/))
      .required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    errorResponse(req, res, error.message, 400, error);
  } else {
    next();
  }
}

module.exports = { register };
