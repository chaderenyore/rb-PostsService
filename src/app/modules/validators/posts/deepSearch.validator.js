const Joi = require("joi");

exports.deepSearchSchema = Joi.object({
    search_value: Joi.required().required(),
  });
