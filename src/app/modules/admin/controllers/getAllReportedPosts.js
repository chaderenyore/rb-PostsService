const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const ReportedPostsService = require("../../posts/services/reportedPosts.services");

const logger = require("../../../../../logger.conf");

exports.getAllReportedPosts = async (req, res, next) => {
  try {
    const posts = await new ReportedPostsService().getAll(req.query.limit, req.query.page);
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
