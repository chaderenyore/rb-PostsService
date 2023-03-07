const { HTTP } = require("../../../../../_constants/http");
const { RESPONSE } = require("../../../../../_constants/response");
const createError = require("../../../../../_helpers/createError");
const { createResponse } = require("../../../../../_helpers/createResponse");
const PostsService = require("../../../posts/services/posts.services");
const TweetService = require("../../../posts/services/tweets.services");
const RepostService = require("../../../posts/services/repost.services");
const CommunityService = require("../../../posts/services/communityPosts.services");
const PostLikeService = require("../../services/postLikes.services");
const logger = require("../../../../../../logger.conf");

exports.unLikeAPost = async (req, res, next) => {
  try {
    // search if usr owns post
    const post = await new PostsService().findAPost({
      _id: req.query.original_post_id,
    });
    if (!post) {
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
        // check if like exists
        const likeExist = await new PostLikeService().findARecord({
          post_id: req.query.original_post_id,
          user_id: req.user.user_id,
        });
        if (!likeExist) {
          return next(
            createError(HTTP.OK, [
              {
                status: RESPONSE.SUCCESS,
                message: "You Have Npot LIke This Post",
                statusCode: HTTP.OK,
                data: null,
                code: HTTP.OK,
              },
            ])
          );
        } else {
          const Like = await new PostLikeService().deletOne({
            post_id: req.query.original_post_id,
            user_id: req.user.user_id,
          });
          // increment like count on post
          const updatedCommunityPost = await new CommunityService().update(
            { original_post_id: req.query.original_post_id },
            { $inc: { 'total_likes': -1 } }
          );

          const updatedPost = await new PostsService().update(
            { post_id: req.query.original_post_id },
            { $inc: { 'total_likes': -1 } }
          );
          // check if post liked is a tweet or repost and update respectively
          if (post.post_type === "tweet") {
            const updatedTweet = await new TweetService().update(
              { post_id: req.query.original_post_id },
              { $inc: { 'total_likes': -1 } }
            );
          }
          if (post.post_type === "repost") {
            const updatedRePost = await new RepostService().update(
              { post_id: req.query.original_post_id },
              { $inc: { 'total_likes': -1 } }
            );
          }

          return createResponse("You UnLiked A Post", Like)(res, HTTP.OK);
        }

    }
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
