const Joi = require('joi').extend(require('@joi/date'));
Joi.objectId = require('joi-objectid')(Joi);

exports.suggestedSchmea = Joi.object().keys({
  suggested_users: Joi.Array().items(
    Joi.Object({
      email: Joi.string().email().trim().required(),
      user_id: Joi.string().optional(),
      username: Joi.string()
        .trim()
        .when('email', {
          not: Joi.exist(),
          then: Joi.required(),
          otherwise: Joi.optional(),
        })
        .label('username or email'),
      user_type: Joi.string().trim().valid('user', 'org').required(),
    })
  ),
});
