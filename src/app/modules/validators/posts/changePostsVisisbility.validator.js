const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.changePostVisibilitySchema = Joi.object({
    post_id: Joi.objectId().required(),
    visible: Joi.string().valid('true', 'false').required()
  });