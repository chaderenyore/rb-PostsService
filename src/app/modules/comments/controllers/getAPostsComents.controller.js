const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const PostsService = require("../../posts/services/posts.services");
const CommentService = require("../services/comments.services");

const logger = require("../../../../../logger.conf");

exports.getAllPostComments = async (req, res, next) => {
  try {
    // check if post exist
    const post = await new PostsService().findAPost({ _id: req.query.post_id });
    console.log("POST ============== ", post);
    if (!post) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "Post Does Not Exist",
            statusCode: HTTP.Ok,
            data: {},
            code: HTTP.Ok,
          },
        ])
      );
    } else {
      // get all commnets
      const comments = await new CommentService().GetAllRecords(
        req.query.limit,
        req.query.page,
        { post_id: req.query.post_id }
      );
      if (comments.data.length === 0) {
        return next(
          createError(HTTP.OK, [
            {
              status: RESPONSE.SUCCESS,
              message: "This Post Has No Comments Yet",
              statusCode: HTTP.OK,
              data: null,
              code: HTTP.OK,
            },
          ])
        );
      } else {
        return createResponse("Posts Comments Fetched", comments)(res, HTTP.OK);
      }
    }
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
