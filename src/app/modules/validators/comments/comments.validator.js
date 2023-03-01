const Joi = require('joi').extend(require('@joi/date'));
Joi.objectId = require('joi-objectid')(Joi);

exports.commentSchema = Joi.object().keys({
  email: Joi.string().email().trim().optional(),
  user_id: Joi.string().optional(),
  tweet_id: Joi.string().optional(),
  repost_id: Joi.string().optional(),
  post_id: Joi.string()
    .when('tweet_id', {
      not: Joi.exist(),
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .when('repost_id', {
      not: Joi.exist(),
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .label('PostId TweetId or a RepostId'),
  comment_body_text: Joi.string().required(),
  comment_id: Joi.string().required(),
  post_type: Joi.string().required(),
});
