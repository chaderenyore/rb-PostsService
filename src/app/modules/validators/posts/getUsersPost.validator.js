const Joi = require("joi");

exports.getUsersPostsQuerySchema = Joi.object({
    page: Joi.number().positive().optional(),
    limit: Joi.number().positive().optional(),
    post_type: Joi.string().valid('all', 'myreposts', 'mytweets', 'shared').optional()
  });
