const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const BlockedService = require("../../posts/services/blockedPost.services");

const logger = require("../../../../../logger.conf");

exports.getAllBlockedPosts = async (req, res, next) => {
  try {
    // search for posts
    const posts = await new BlockedService().getAll(req.query.limit, req.query.page, {});
    if (posts.data.length === 0) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.ERROR,
            message: "No Blocked Posts At The Moment",
            statusCode: HTTP.OK,
            data: {},
            code: HTTP.OK,
          },
        ])
      );
    } else {
      return createResponse("All Blocked Posts Retrieved", posts)(res, HTTP.OK);
      
    }
    
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
