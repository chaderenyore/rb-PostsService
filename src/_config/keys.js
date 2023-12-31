const dotenv = require("dotenv");
dotenv.config();

const KEYS = {
  mongoURI: process.env.MONGODBURI,
  JWTSecret: process.env.JWTSECRET,
  expiresIn: process.env.EXPIRES_IN,
  redisHost: process.env.REDISHOST,
  redisPort: process.env.REDISPORT,
  redisPassword: process.env.REDISPASSWORD,
  appVersion: process.env.APP_VERSION,
  PUSHER_APPID: process.env.PUSHER_APPID,
  PUSHER_KEY: process.env.PUSHER_KEY,
  PUSHER_SECRET: process.env.PUSHER_SECRET,
  PUSHER_CLUSTER: process.env.PUSHER_CLUSTER,
  USER_SERVICE_URI: process.env.USER_SERVICE_URI,
  AUTH_URI: process.env.AUTH_URI,
  ADMIN_SERVICE_URI: process.env.ADMIN_SERVICE_URI,
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AMQP_URI:process.env.AMQP_URI,
  UPDATE_USER_POST_DETAILS: process.env.UPDATE_USER_POST_DETAILS,
  UPDATE_USER_POST_COMMENT_DETAILS: process.env.UPDATE_USER_POST_COMMENT_DETAILS,
  UPDATE_USER_POST_LIKE_DETAILS: process.env.UPDATE_USER_POST_LIKE_DETAILS,
  UPDATE_USER_POST_COMMENTREPLIES_DETAILS: process.env.UPDATE_USER_POST_COMMENTREPLIES_DETAILS,
  UPDATE_USER_POST_COMMENTS_LIKES_DETAILS: process.env.UPDATE_USER_POST_COMMENTS_LIKES_DETAILS,
  IN_APP_NOTIFICATION_QUEUE: process.env.IN_APP_NOTIFICATION_QUEUE,
  UPDATE_USER_DETAILS_QUEUE: process.env.UPDATE_USER_DETAILS_QUEUE
};

module.exports = KEYS;
