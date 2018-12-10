const Joi = require("joi");

const schema = {
  id: Joi.number().allow(null),
  message: Joi.string()
    .max(4000)
    .required(),
  photoUrl: Joi.string()
    .allow("")
    .max(4000),
  linkUrl: Joi.string()
    .allow("")
    .max(4000),
  videoUrl: Joi.string()
    .allow("")
    .max(4000),
  typeId: Joi.string(),
  isPush: Joi.bool().required(),
  isSms: Joi.bool().required(),
  startDate: Joi.date(),
  endDate: Joi.date(),
  lat: Joi.number(),
  long: Joi.number(),
  geoRadius: Joi.number(),
  tags: Joi.array(),
  campaignId: Joi.number().allow(null),
  businessId: Joi.number().allow(null)
};

module.exports = Joi.object().keys(schema);
