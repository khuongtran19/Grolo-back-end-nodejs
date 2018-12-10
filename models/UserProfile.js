const Joi = require("joi");

const schema = {
  id: Joi.number(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string(),
  street: Joi.string(),
  city: Joi.string(),
  userState: Joi.string(),
  zip: Joi.number(),
  avatarUrl: Joi.string(),
  phoneNumber: Joi.string()
};
module.exports = Joi.object().keys(schema);
