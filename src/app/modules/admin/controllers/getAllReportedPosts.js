const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const PostsService = require("../../posts/services/posts.services");

const logger = require("../../../../../logger.conf");

exports.getAllReportedPosts = async (req, res, next) => {
  try {
    // search for posts reported
    const queryData = {
        is_reported: true
    }
    const posts = await new PostsService().getAll(req.query.limit, req.query.page, queryData);
    if (posts.data.length === 0) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.ERROR,
            message: "No Reported Posts At The Moment",
            statusCode: HTTP.OK,
            data: {},
            code: HTTP.OK,
          },
        ])
      );
    }
      return createResponse("All Reported Posts Retrieved", posts)(res, HTTP.OK);
    
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
