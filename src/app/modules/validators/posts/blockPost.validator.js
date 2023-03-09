const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.blockPostQuerySchema = Joi.object({
    post_id: Joi.objectId().required(),
    post_id: Joi.objectId().required(),
    block_narration: Joi.string().optional()
  });