const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.banPostsSchema = Joi.object({
    ids: Joi.array().required(),
  });