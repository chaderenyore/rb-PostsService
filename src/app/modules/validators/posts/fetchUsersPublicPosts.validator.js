const Joi = require("joi");

exports.getCommunityPostsQuerySchema = Joi.object({
    page: Joi.number().positive().optional(),
    limit: Joi.number().positive().optional(),
    user_id: Joi.string().required()
  });
