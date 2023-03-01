const Joi = require("joi");

exports.searchSchema = Joi.object({
  poster_username: Joi.string().required(),
  poster_fullname: Joi.string().uri().optional(),
  sponsored: Joi.string().valid('true', 'false').optional(),
  post_type: Joi.string().optional()
  });
