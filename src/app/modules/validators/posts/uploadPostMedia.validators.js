const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.uploadPostMediaQuerySchema = Joi.object({
    post_id: Joi.objectId().required(),
  });
  exports.uploadPostMediaBodySchema = Joi.object({
    post_media: Joi.string().optional(),
  });
