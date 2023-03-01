const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const PostsService = require("../services/posts.services");
const CommunityPostsService = require("../services/communityPosts.services");
const RePostsService = require("../services/repost.services");
const TweetPostsService = require("../services/tweets.services");
const BlockedPostsService = require("../services/blockedPost.services");
const RecycleBinService = require("../services/recycleBin.services");

const logger = require("../../../../../logger.conf");

exports.deletePost = async (req, res, next) => {
  try {
    //  checkif user owns the post
    const IsMyPost = await new PostsService().findAPost({
      _id: req.query.post_id,
      poster_id: req.user.user_id,
    });
    if (!IsMyPost) {
      return next(
        createError(HTTP.UNAUTHORIZED, [
          {
            status: RESPONSE.ERROR,
            message: "Unauthorized To Perform This Action",
            statusCode: HTTP.UNAUTHORIZED,
            data: null,
            code: HTTP.UNAUTHORIZED,
          },
        ])
      );
    } else {
      // delete post
      const deletedPost = await new PostsService().deleteOne({
        post_id: req.query.post_id,
      });
      //    delete community
      const deletedCommunity = await new CommunityPostsService().deletOne({original_post_id:req.query.post_id});
      // update all tweets and repost of this post
      const updatedRePost = await new RePostsService().update(
        { post_id: req.body.post_id, poster_id: req.user.user_id },
        { original_is_deleted: true }
      );
      const updatedTweetsPost = await new TweetPostsService().update(
        { post_id: req.body.post_id, poster_id: req.user.user_id },
        { original_is_deleted: true }
      );

      const updatedBlockedPost = await new BlockedPostsService().update(
        { post_id: req.body.post_id, poster_id: req.user.user_id },
        { original_is_deleted: true }
      );

          // save deleted posts in recycle bin
    const bin = await new RecycleBinService().create({...deletedPost})
    return createResponse(`Post Deleted`, bin)(res, HTTP.OK);
    }
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
