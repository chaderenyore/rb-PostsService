const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const PostService = require("../services/posts.services");
const logger = require("../../../../../logger.conf");

exports.getPostDtails = async (req, res, next) => {
  try {
    const post = await new PostService().findAPost({ _id: req.params.post_id });
    if (!post) {
      return next(
        createError(HTTP.BAD_REQUEST, [
          {
            status: RESPONSE.ERROR,
            message: "Post Does Not Exist",
            statusCode: HTTP.BAD_REQUEST,
            data: {},
            code: HTTP.BAD_REQUEST,
          },
        ])
      );
    } else {
      return createResponse(`Post Retrieved`, post)(res, HTTP.OK);
    }
  } catch (err) {
    logger.error(err);

    return next(createError.InternalServerError(err));
  }
};
