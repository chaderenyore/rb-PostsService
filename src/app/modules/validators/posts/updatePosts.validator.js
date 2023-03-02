const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.updatePostsBodySchema = Joi.object().keys({
  post_title: Joi.string().optional(),
  post_body_text: Joi.string().optional(),
});

exports.updatePostsQuerySchema = Joi.object().keys({
  post_id: Joi.objectId().required(),
});
