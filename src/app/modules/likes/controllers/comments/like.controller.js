const axios = require("axios").default;
const { HTTP } = require("../../../../../_constants/http");
const { RESPONSE } = require("../../../../../_constants/response");
const createError = require("../../../../../_helpers/createError");
const { createResponse } = require("../../../../../_helpers/createResponse");
const PostsService = require("../../../posts/services/posts.services");
const CommentService = require("../../../comments/services/comments.services");
const CommentLikeService = require("../../services/commentLikes.services");
const logger = require("../../../../../../logger.conf");
const KEYS = require("../../../../../_config/keys");

exports.likeAComment = async (req, res, next) => {
  try {
    // search if usr owns post
    const comment = await new CommentService().findAComment({
      _id: req.query.comment_id,
    });
    if (!comment) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "This Comment Does Not Exist",
            statusCode: HTTP.OK,
            data: null,
            code: HTTP.OK,
          },
        ])
      );
    } else {
      // check if post exists
      const post = await new PostsService().findAPost({
        _id: comment.post_id,
      });
      if (!post) {
        return next(
          createError(HTTP.OK, [
            {
              status: RESPONSE.SUCCESS,
              message: "This Post Does Not Exist/Has Been Deleted",
              statusCode: HTTP.OK,
              data: null,
              code: HTTP.OK,
            },
          ])
        );
      } else {
              // Get user Info creating post
      const user = await axios.get(
        `${KEYS.USER_SERVICE_URI}/users/v1/user/${req.user.user_id}?platform=web`,
        {
          headers: {
            Authorization: `Bearer ${req.token}`,
          },
        }
      );
      if (user && user.data && user.data.code === 200) {
        let firstname;
        let fullname;
        if(user.data.data.first_name && user.data.data.firstname !== " "){
         firstname = user.data.data.firstname;
         fullname = firstname;
        }
        if(user.data.data.last_name && user.data.data.last_name !== " "){
         fullname = `${firstname} ${user.data.data.last_name}`
        }
        //  save to users repost
        const dataToLikeModel = {
          comment_id: comment._id,
          user_id: req.user.user_id,
          fullname: fullname || "",
          username: user.data.data.username ? user.data.data.username : "",
          user_image: user.data.data.image ? user.data.data.image : "",
        };
          // check if like exists
          const likeExist = await new CommentLikeService().findARecord({
            comment_id: req.query.post_id,
            user_id: req.user.user_id,
          });
          if (likeExist) {
            return next(
              createError(HTTP.OK, [
                {
                  status: RESPONSE.SUCCESS,
                  message: "You Have ALready Liked This Comment",
                  statusCode: HTTP.OK,
                  data: null,
                  code: HTTP.OK,
                },
              ])
            );
          } else {
            // create a cpommentLike Rrecord
        const Like = await new CommentLikeService().create(dataToLikeModel);
            // increment like count on comment
            const updatedComment = await new CommentService().updateARecord(
              { _id: req.query.post_id },
              { $inc: { 'total_likes': 1 } }
            );
            return createResponse("You UnLiked A Comment", updatedComment)(
              res,
              HTTP.OK
            );
          }
        }
      }
    }
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
