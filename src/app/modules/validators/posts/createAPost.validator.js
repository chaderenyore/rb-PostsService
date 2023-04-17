const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.createPostsSchema = Joi.object().keys({
  post_title: Joi.string().optional(),
  post_body_text: Joi.string().required(),
});
