const Joi = require("joi");

const CreateUser = Joi.object({
  name: Joi.string().min(3).required(),
  username: Joi.string().min(3).required(),
  email: Joi.string().email(),
  password: Joi.string().min(8).required(),
});

const UserLogin = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(8).required(),
});

module.exports = { CreateUser, UserLogin };
