const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.repostBodySchema = Joi.object().keys({
  original_post_id: Joi.objectId().required(),
  reposter_id: Joi.objectId().optional(),
  reposted_title: Joi.string().optional(),
  reposted_body_text: Joi.string().optional(),
  poster_username: Joi.string().optional(),
});

exports.repostQuerySchema = Joi.object().keys({
    repost_type: Joi.string().valid('repost', 'tweet').optional(),
  });