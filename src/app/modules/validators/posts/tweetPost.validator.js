const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.tweetPostSchema = Joi.object({
    original_post_id: Joi.objectId().required(),
  });