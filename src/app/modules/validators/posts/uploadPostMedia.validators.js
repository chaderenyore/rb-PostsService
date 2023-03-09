const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.uploadPostMediaQuerySchema = Joi.object({
    post_id: Joi.objectId().required(),
    media_type: Joi.string().valid('image', 'video').required()
  });
  exports.uploadPostMediaBodySchema = Joi.object({
    post_media: Joi.string().optional(),
  });
