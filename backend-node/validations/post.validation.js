const Joi = require("joi");

const createSchema = Joi.object({
  caption: Joi.string().required(),
  media: Joi.array()
    .items(
      Joi.object({
        src: Joi.string().required(),
        type: Joi.string().required(),
      })
    )
    .required(),
  location: Joi.string().required(),
  tags: Joi.array().items(Joi.string().required()).required(),
});

module.exports = { createSchema };
