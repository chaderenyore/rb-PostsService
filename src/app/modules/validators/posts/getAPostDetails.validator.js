const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.getSinglePostSchema = Joi.object({
    post_id: Joi.objectId().required()
  });
