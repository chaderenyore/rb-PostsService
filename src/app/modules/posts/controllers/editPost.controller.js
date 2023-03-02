const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const PostsService = require("../services/posts.services");
const CommunityPostsService = require("../services/communityPosts.services");

const logger = require("../../../../../logger.conf");

exports.updatePostInfo = async (req, res, next) => {
  try {
    // check if same parameters where inputed
    if (Object.entries(req.body).length > 0 === false) {
      return next(
        createError(HTTP.BAD_REQUEST, [
          {
            status: RESPONSE.ERROR,
            message: "No Fields Marked For Update",
            statusCode: HTTP.BAD_REQUEST,
            data: {},
            code: HTTP.BAD_REQUEST,
          },
        ])
      );
    } else {
      const dataToUpdatePost = {
        was_edited: true,
        ...req.body,
      };
      const updatedPost = await new PostsService().update(
        { post_id: req.body.post_id, poster_id: req.user.user_id },
        dataToUpdatePost
      );
      if (!updatedPost) {
        return next(
          createError(HTTP.OK, [
            {
              status: RESPONSE.SUCCESS,
              message: "Post Does Not Exist/UnAuthorised",
              statusCode: HTTP.Ok,
              data: {},
              code: HTTP.Ok,
            },
          ])
        );
      } else {
        //  update community posts
        const dataToUpdateCommunity = {
          was_edited: true,
          ...req.body,
        };
        const postInCommunity = await new CommunityPostsService().update(
          { original_post_id: req.body.post_id, poster_id: req.user.user_id },
          dataToUpdateCommunity
        );
        return createResponse(`Post Updated`, updatedPost)(res, HTTP.OK);
      }
    }
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
