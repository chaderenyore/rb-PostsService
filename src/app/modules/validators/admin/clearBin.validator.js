const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.clearBinSchema = Joi.object({
    post_ids: Joi.array().required(),
  });