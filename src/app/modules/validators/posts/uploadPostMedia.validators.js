const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.uploadPostMediaBodySchema = Joi.object({
    post_id: Joi.objectId().required(),
    post_media: Joi.string().required()
  });

exports.uploadPostMediaQuerySchema = Joi.object({
    media_type: Joi.string().valid('image', 'video').required()
  });
