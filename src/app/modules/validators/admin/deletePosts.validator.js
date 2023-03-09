const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.deletePostsSchema = Joi.object({
    post_ids: Joi.array().required(),
  });