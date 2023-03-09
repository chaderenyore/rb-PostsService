const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const RecycleService = require("../../posts/services/recycleBin.services");

const logger = require("../../../../../logger.conf");

exports.getAllBinPosts = async (req, res, next) => {
  try {
    // search for posts
    const posts = await new RecycleService().getAll(req.query.limit, req.query.page, {});
    if (posts.data.length === 0) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.ERROR,
            message: "No Posts In Bin At The Moment",
            statusCode: HTTP.OK,
            data: {},
            code: HTTP.OK,
          },
        ])
      );
    }
      return createResponse("All Bin Posts Retrieved", posts)(res, HTTP.OK);
    
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
