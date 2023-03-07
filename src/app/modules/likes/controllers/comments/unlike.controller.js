const { HTTP } = require("../../../../../_constants/http");
const { RESPONSE } = require("../../../../../_constants/response");
const createError = require("../../../../../_helpers/createError");
const { createResponse } = require("../../../../../_helpers/createResponse");
const PostsService = require("../../../posts/services/posts.services");
const TweetService = require("../../../posts/services/tweets.services");
const RepostService = require("../../../posts/services/repost.services");
const CommunityService = require("../../../posts/services/communityPosts.services");
const CommentService = require("../../../comments/services/comments.services");
const CommentLikeService = require("../../services/commentLikes.services");
const logger = require("../../../../../../logger.conf");

exports.unLikeAComment = async (req, res, next) => {
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
      // find comment post
      // search if usr owns post
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
        // check if like exists
        const likeExist = await new CommentLikeService().findARecord({
          comment_id: req.query.post_id,
          user_id: req.user.user_id,
        });
        if (!likeExist) {
          return next(
            createError(HTTP.OK, [
              {
                status: RESPONSE.SUCCESS,
                message: "You Have Not Liked This Comment",
                statusCode: HTTP.OK,
                data: null,
                code: HTTP.OK,
              },
            ])
          );
        } else {
          // increment like count on post
          const updatedCommunityPost = await new CommunityService().update(
            { _id: req.query.post_id },
            { $inc: { total_comments: 1 } }
          );

          const updatedPost = await new PostsService().update(
            { _id: req.query.post_id },
            { $inc: { total_comments: 1 } }
          );
          // check if post liked is a tweet or repost and update respectively
          if (post.post_type === "tweet") {
            const updatedTweet = await new TweetService().update(
              { _id: req.query.post_id },
              { $inc: { total_comments: 1 } }
            );
          }
          if (post.post_type === "repost") {
            const updatedRePost = await new RepostService().update(
              { _id: req.query.post_id },
              { $inc: { total_comments: 1 } }
            );
          }
          return createResponse("You Liked A Comment", Comment)(res, HTTP.OK);
        }
      }
    }
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
