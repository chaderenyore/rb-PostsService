const { HTTP } = require("../../../../../_constants/http");
const { RESPONSE } = require("../../../../../_constants/response");
const createError = require("../../../../../_helpers/createError");
const { createResponse } = require("../../../../../_helpers/createResponse");
const PostsService = require("../../../posts/services/posts.services");
const CommentService = require("../../../comments/services/comments.services");
const CommentLikeService = require("../../services/commentLikes.services");
const logger = require("../../../../../../logger.conf");

exports.likeAComment = async (req, res, next) => {
  try {
    // search if usr owns post
    const comment = await new PostsService().findAPost({
      _id: req.body.comment_id,
    });
    if(!comment){
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "This Post Does Not Exist",
            statusCode: HTTP.OK,
            data: null,
            code: HTTP.OK,
          },
        ])
      );
    } else {
      // Get user Info creating post
      const user = await axios.post(
        `${KEYS.USER_SERVICE_URI}/users/v1/user/${req.user.user_id}?platform=web`,
        {
          headers: {
            Authorization: `Bearer ${req.token}`,
          },
        }
      );
      if (user && user.data && user.data.code === 200) {
        //  save to users repost
        const dataToLikeModel = {
          comment_id: post.poster_id,
          user_id: req.user.user_id,
          fullname: fullname || "",
          username: user.data.data.username ? user.data.data.username : "",
          user_image: user.data.data.image ? user.data.data.image : "",

        };
        const Like = await new CommentLikeService().create(dataToLikeModel);
        // increment like count on comment
        
        return createResponse("You Liked A Comment", Like)(res, HTTP.OK);
      }
    }
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
