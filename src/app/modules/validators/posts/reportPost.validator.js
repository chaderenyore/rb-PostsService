const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.reportPostsSchema = Joi.object().keys({
  post_id: Joi.objectId().required(),
  report_narration: Joi.string().optional(),
});
