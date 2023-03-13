const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const BannedService = require("../../posts/services/bannedPosts.services");

const logger = require("../../../../../logger.conf");

exports.getAllBannedPosts = async (req, res, next) => {
  try {
    // search for posts
    const posts = await new BannedService().getAll(req.query.limit, req.query.page, {});
    if (posts.data.length === 0) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.ERROR,
            message: "No Banned Posts At The Moment",
            statusCode: HTTP.OK,
            data: {},
            code: HTTP.OK,
          },
        ])
      );
    } else {
      return createResponse("All Banned Posts Retrieved", posts)(res, HTTP.OK);
       
    }
    
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
