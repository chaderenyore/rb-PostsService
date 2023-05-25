const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const PostsService = require("../services/posts.services");
const CommunityPostsService = require("../services/communityPosts.services");
const RePostsService = require("../services/repost.services");
const TweetPostsService = require("../services/tweets.services");
const ReportedPostsService = require("../services/reportedPosts.services");

const logger = require("../../../../../logger.conf");

exports.reportAPost = async (req, res, next) => {
  try {
    // check if post is mine(I cnat report my post)
    const isMyPost = await new PostsService().findAPost({
      _id: req.body.post_id,
      poster_id: req.user.user_id,
    });
    if (isMyPost) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.ERROR,
            message: "You Cant Report Your Own Post",
            statusCode: HTTP.Ok,
            data: {},
            code: HTTP.Ok,
          },
        ])
      );
    }
    // check if this post has been reported by you before
    const isReportedPost = await new ReportedPostsService().findARecord({
      post_id: req.body.post_id,
      reporter_id: req.user.user_id,
    });
    if (isReportedPost) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.ERROR,
            message: "This Post Has Been Reported By You Already",
            statusCode: HTTP.Ok,
            data: {},
            code: HTTP.Ok,
          },
        ])
      );
    } else {
      // check if same parameters where inputed
      const reportedPost = await new PostsService().update(
        { _id: req.body.post_id },
        {
          $inc: { 'report_count': 1 },
          is_reported: true,
          report_narration: req.body.report_narration,
        }
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
          { original_post_id: req.body.post_id, poster_id: req.user.user_id },
          {
            $inc: { 'report_count': 1 },
            is_reported: true,
            report_narration: req.body.report_narration,
          }
        );
        const updatedRepost = await new RePostsService().update(
          { post_id: req.body.post_id, poster_id: req.user.user_id },
          { original_is_reported: true }
        );
        const updatedTweets = await new TweetPostsService().update(
          { post_id: req.body.post_id, poster_id: req.user.user_id },
          { original_is_reported: true }
        );
        //   save reported posts
        const redportedPost = await new ReportedPostsService().create({
          post_id: req.body.post_id,
          post_body: reportedPost.post_body_text,
          post_title:reportedPost.post_title,
          post_media: reportedPost.post_media,
          reporter_id: req.user.user_id,
          reporter_username: req.user.username ? req.user.username : "",
          report_narration: req.body.report_narration,
        });
        return createResponse(`You Reported A Post`, reportedPost)(
          res,
          HTTP.OK
        );
      }
    }
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
