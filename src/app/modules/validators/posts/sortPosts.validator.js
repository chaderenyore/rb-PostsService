const Joi = require("joi").extend(require("@joi/date"));

exports.sortPostsByDateSchema = Joi.object({
    page: Joi.number().positive().optional(),
    limit: Joi.number().positive().optional(),
    start_date: Joi.date().format(["YYYY/MM/DD", "DD-MM-YYYY"]).required(),
    end_date: Joi.date().format(["YYYY/MM/DD", "DD-MM-YYYY"]).required(),
    post_type: Joi.string().valid('community', 'myposts', 'mytweets', 'myreposts').required()
  });