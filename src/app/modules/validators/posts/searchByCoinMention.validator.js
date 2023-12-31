const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.searchByCoinMentionQuerySchema = Joi.object({
  page: Joi.number().positive().optional(),
  limit: Joi.number().positive().optional(),
  coin_name: Joi.string().required(),
});
