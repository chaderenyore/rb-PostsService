const Joi = require('joi').extend(require('@joi/date'));
Joi.objectId = require('joi-objectid')(Joi);

exports.commentSchema = Joi.object().keys({
  email: Joi.string().email().trim().optional(),
  user_id: Joi.string().optional(),
  post_id: Joi.string().required(),
  child_comment_id: Joi.string().optional(),
  commenter_image: Joi.string().uri(),
  commenter_fullname: Joi.string(),
  commenter_username: Joi.string()
    .optional(),
  total_likes: Joi.number().required(),
  imageUrl: Joi.string().uri(),
});
