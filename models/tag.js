const Joi = require("joi");

const schema = {
  id: Joi.number(),
  name: Joi.string()
    .min(2)
    .max(50)
    .required(),
  tenantId: Joi.number(),
  activeStatus: Joi.boolean()
};

module.exports = Joi.object().keys(schema);
