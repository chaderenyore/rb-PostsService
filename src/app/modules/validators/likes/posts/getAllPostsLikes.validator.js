const Joi = require("joi");

exports.getAllPostsLikesQuerySchema = Joi.object({
    page: Joi.number().positive().optional(),
    limit: Joi.number().positive().optional(),
    community_id: Joi.string().required()
  });
