const Joi = require("joi");

exports.deepSearchSchema = Joi.object({
  search_value: Joi.string().required(),
  });
