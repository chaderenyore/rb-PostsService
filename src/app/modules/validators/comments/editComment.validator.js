const Joi = require('joi').extend(require('@joi/date'));
Joi.objectId = require('joi-objectid')(Joi);

exports.editCommentSchema = Joi.object().keys({
  post_id: Joi.string().required(),
  comment_body_text: Joi.string().optional(),
  comment_id: Joi.string().required(),
});
