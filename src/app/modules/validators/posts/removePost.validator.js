const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.deletePostSchema = Joi.object({
    community_id: Joi.objectId().required()
  });
