const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.updatePostsSchema = Joi.object().keys({
  poster_id: Joi.objectId().optional(),
  poster_id: Joi.objectId().optional(),
  poster_fullname: Joi.string().optional(),
  poster_username:Joi.string().optional(),
  post_title: Joi.string().optional(),
  post_body_text: Joi.string().optional(),
  poster_image: Joi.string().uri().optional(),
  post_video: Joi.string().uri().optional(),
});
