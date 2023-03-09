const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const CommunityPostsService = require("../services/communityPosts.services");
const logger = require("../../../../../logger.conf");

exports.deepSearchPost = async (req, res, next) => {
  try {
    const { search_value } = req.query;
    const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
    const searchRgx = rgx(search);
    const posts = await new CommunityPostsService().getAll(req.query.limit, req.query.page, {
        $or: [
          { poster_fullname: { $regex: searchRgx, $options: "i" } },
          { poster_username: { $regex: searchRgx, $options: "i" } },
          { post_title: { $regex: searchRgx, $options: "i" } },
        //  to add chelid filter

        ],
      });
    if (posts.data.length === 0) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: ErrorMessage,
            statusCode: HTTP.OK,
            data: {},
            code: HTTP.OK,
          },
        ])
      );
    } else {
      return createResponse(`Post Fetched, serach string: ${search_value}`, posts)(res, HTTP.OK);
    }
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
