const { HTTP } = require("../../../../../_constants/http");
const { RESPONSE } = require("../../../../../_constants/response");
const createError = require("../../../../../_helpers/createError");
const { createResponse } = require("../../../../../_helpers/createResponse");
const PostLikeService = require("../../services/postLikes.services");
const logger = require("../../../../../../logger.conf");

exports.getAPostLikes = async (req, res, next) => {
  try {
    // query data
    const dataToQuery = {
        post_id: req.query.original_post_id
    } 
    const likes = await new PostLikeService().GetAllRecords(req.query.limit, req.query.page, dataToQuery);
    if (likes.data.length === 0) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "This Post Has No Likes",
            statusCode: HTTP.OK,
            data: null,
            code: HTTP.OK,
          },
        ])
      );
    } else {
        return createResponse("Post Likes Retreived", likes)(res, HTTP.OK);
      } 
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
