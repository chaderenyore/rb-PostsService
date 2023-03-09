const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);

exports.getAllPostCommentQuerySchema = Joi.object({
    page: Joi.number().positive().optional(),
    limit: Joi.number().positive().optional(),
    post_id: Joi.objectId().required()
  });
