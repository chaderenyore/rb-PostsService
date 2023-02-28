const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const PostsService = require("../services/posts.services");
const CommunityPostsService = require("../services/communityPosts.services");
const RePostsService = require("../services/repost.services");
const TweetPostsService = require("../services/tweets.services");
const BlockedPostsService = require("../services/blockedPosts.services");
const ReportedPostsService = require("../services/blockedPosts.services");
const logger = require("../../../../../logger.conf");

exports.blockAPost = async (req, res, next) => {
  try {
    // check if same parameters where inputed
      const post = await new PostsService().findAPost(
        { post_id: req.body.post_id}
      );
      if (post) {
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
// search if posts is already blocked by user
const isBlocked = new await BlockedPostsService().findAPost({blocker_id: req.user.user_id, post_id:req.body.post_id});
if(isBlocked){
    return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "You Have Blocked This Posts Already",
            statusCode: HTTP.Ok,
            data: {},
            code: HTTP.Ok,
          },
        ])
      );
} else {
     //   save to user blocked posts
const blockedPost = await new BlockedPostsService().create(
    { poster_id: post.poster_id, post_id: post_id, blocker_id: req.user.user_id, block_narration: req.body.block_narration}
  );
        return createResponse(`You Blocked A Post}`,  blockedPost)(res, HTTP.OK);
}
      }
    }
   catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
