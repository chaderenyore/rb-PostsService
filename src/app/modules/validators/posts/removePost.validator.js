const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.deletePostSchema = Joi.object({
    post_id: Joi.objectId().required()
  });
