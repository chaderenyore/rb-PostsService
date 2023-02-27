const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const PostsService = require("../services/posts.services");
const CommunityPostsService = require("../services/communityPosts.services");
const RePostsService = require("../services/repost.services");
const TweetPostsService = require("../services/tweets.services");
const BlockedPostsService = require("../services/blockedPosts.services");
const logger = require("../../../../../logger.conf");

exports.reportAPost = async (req, res, next) => {
  try {
    // check if same parameters where inputed
      const reportedPost = await new PostsService().update(
        { post_id: req.body.post_id},
        {$inc: { 'report_count': 1 }, is_reported: true, report_narration: req.body.report_narration }
      );
      if (!reportedPost) {
        return next(
          createError(HTTP.OK, [
            {
              status: RESPONSE.ERROR,
              message: "Post Does Not Exist",
              statusCode: HTTP.Ok,
              data: {},
              code: HTTP.Ok,
            },
          ])
        );
        } else {
    //   update post in community, blocked , tweets and reported
  const updatedCommunity = await new CommunityPostsService().update(
    { original_post_id: req.body.post_id, poster_id: req.user.user_id},
    {$inc: { 'report_count': 1 }, is_reported: true, report_narration: req.body.report_narration }
  );
  const updatedRepost = await new RePostsService().update(
    { post_id: req.body.post_id, poster_id: req.user.user_id},
    { original_is_reported: true}
  );
  const updatedTweets = await new TweetPostsService().update(
    { post_id: req.body.post_id, poster_id: req.user.user_id},
    { original_is_reported: true}
  );
  const updatedBlockedPost = await new BlockedPostsService().update(
    { post_id: req.body.post_id, poster_id: req.user.user_id},
    { original_is_reported: true}
  );
        return createResponse(`You Reported A Post}`,  reportedPost)(res, HTTP.OK);
      }
    }
   catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
