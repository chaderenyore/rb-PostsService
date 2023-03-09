const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.UnlikeAPostsQuerySchema = Joi.object({
    original_post_id: Joi.objectId().required(),
  });