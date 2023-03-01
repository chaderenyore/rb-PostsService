const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.createPostsSchema = Joi.object().keys({
  poster_id: Joi.objectId().required(),
  post_title: Joi.string().required(),
  post_body_text: Joi.string().required(),
  poster_image: Joi.string().uri().optional(),
  post_image: Joi.string().uri().optional(),
  post_video: Joi.string().uri().optional(),
  total_likes: Joi.number().positive().optional(),
  total_comments: Joi.number().positive().optional(),
  total_times_reposted: Joi.number().positive().optional(),
  total_posts_tweets: Joi.number().positive().optional(),
  is_sponsored: Joi.boolean().optional(),
  was_edited: Joi.boolean().optional(),
  is_blocked: Joi.boolean().optional(),
  is_reported: Joi.boolean().optional(),
  report_narration: Joi.boolean().optional(),
});
