const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const PostsService = require("../services/posts.services");
const CommunityPostsService = require("../services/communityPosts.services");
const logger = require("../../../../../logger.conf");

exports.filterPosts = async (req, res, next) => {
  try {
    // filter banned posts
    let posts;
      return createResponse(`Posts Posts`, posts)(res, HTTP.OK);

  } catch (err) {
    logger.error(err);

    return next(createError.InternalServerError(err));
  }
};
