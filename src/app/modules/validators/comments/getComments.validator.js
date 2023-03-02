const Joi = require('joi').extend(require('@joi/date'));
Joi.objectId = require('joi-objectid')(Joi);

exports.getCommentSchema = Joi.object().keys({
  post_id: Joi.string().required(),
});
