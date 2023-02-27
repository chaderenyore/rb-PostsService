const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.filterPostsSchema = Joi.object().keys({
  post_id: Joi.objectId().optional(),
  poster_fullname: Joi.string().optional(),
  poster_username:Joi.string().optional(),
  post_title: Joi.string().optional(),
  post_body_text: Joi.string().optional(),
  post_image: Joi.string().uri().optional(),
  total_times_reposted: Joi.number().positive().optional(),
  total_posts_tweets: Joi.number().positive().optional(),
  is_sponsored: Joi.boolean().optional(),
  was_edited: Joi.boolean().optional(),
  referral_count: Joi.number().positive().optional(),
  is_blocked: Joi.boolean().optional(),
  is_reported: Joi.boolean().optional(),
  report_narration: Joi.boolean().optional(),
});
