const Joi = require("joi");

const schema = {
  id: Joi.number(),
  name: Joi.string()
    .min(2)
    .max(50),
  industryId: Joi.number(),
  appUserId: Joi.number(),
  numberOfEmployees: Joi.number(),
  isRoaming: Joi.number(),
  url: Joi.string()
    .min(2)
    .max(50),
  phoneNumber: Joi.string()
    .min(2)
    .max(50),
  fbPage: Joi.string()
    .min(2)
    .max(50),
  twitterUrl: Joi.string()
    .min(2)
    .max(50),
  igUrl: Joi.string()
    .min(2)
    .max(50),
  logoUrl: Joi.string()
    .min(2)
    .max(150),
  bannerUrl: Joi.string()
    .min(2)
    .max(150),
  pinterestUrl: Joi.string()
    .min(2)
    .max(50),
  defaultLandingUrl: Joi.string()
    .min(2)
    .max(50),
  street: Joi.string().allow(""),
  city: Joi.string().allow(""),
  zip: Joi.string().allow(""),
  suite: Joi.string().allow(""),
  state: Joi.string().allow("")
};

module.exports = Joi.object().keys(schema);
