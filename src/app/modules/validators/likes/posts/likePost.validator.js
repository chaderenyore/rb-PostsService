const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.likePostsQuerySchema = Joi.object({
    community_id: Joi.objectId().required(),
  });