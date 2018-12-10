const Joi = require("joi");

const schema = {
  PostId: Joi.number(),
  TagId: Joi.number()
};
module.exports = Joi.object().keys(schema);
