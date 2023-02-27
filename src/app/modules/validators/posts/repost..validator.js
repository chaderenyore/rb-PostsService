const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.repostBodySchema = Joi.object().keys({
  post_id: Joi.objectId().optional(),
  reposter_id: Joi.objectId().optional(),
  repposted_title: Joi.string().optional(),
  poster_username:Joi.string().optional(),
  post_title: Joi.string().optional(),
  post_body_text: Joi.string().optional(),
  poster_image: Joi.string().uri().optional(),
  post_video: Joi.string().uri().optional(),
});

exports.repostQuerySchema = Joi.object().keys({
    repost_type: Joi.string().valid('repost', 'tweet').optional(),
  });