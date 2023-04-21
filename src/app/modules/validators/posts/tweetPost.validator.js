const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.tweetPostSchema = Joi.object({
    community_id: Joi.objectId().required(),
    reposter_id: Joi.objectId().optional(),
    tweet_title: Joi.string().optional(),
    tweet_body_text: Joi.string().optional(),
  });