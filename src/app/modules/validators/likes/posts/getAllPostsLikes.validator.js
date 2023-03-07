const Joi = require("joi");

exports.getAllPOstsLikesQuerySchema = Joi.object({
    page: Joi.number().positive().optional(),
    limit: Joi.number().positive().optional(),
    original_post_id: Joi.string().required()
  });
