const Joi = require("joi");

exports.getAllPostsQuerySchema = Joi.object({
    page: Joi.number().positive().optional(),
    limit: Joi.number().positive().optional()
  });
