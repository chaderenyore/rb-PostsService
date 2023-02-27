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

exports.changeVisibility = async (req, res, next) => {
  try {
    // search if usr owns post
    const myPost = await new PostsService().findAPost({poster_id:req.user.usr_id, post_id:req.query.post_id});
    if (!myPost) {
      return next(
        createError(HTTP.UNAUTHORIZED, [
          {
            status: RESPONSE.SUCCESS,
            message: "Unauthorized To Perform This Action",
            statusCode: HTTP.UNAUTHORIZED,
            data: null,
            code: HTTP.UNAUTHORIZED,
          },
        ])
      );
    } else {
      let visibilityState;
      let resmessage;
      if(req.query.visible === "true"){
         visibilityState = true;
         resmessage = `Visibility Turned On`;
      }
      if(req.query.visible === "false"){
         visibilityState = false;
        resmessage = `Visibility Turned Off`;

      }
      // update Posts in community, posts, blocked, tweets, reposts
  const updatedCommunityPost = await new CommunityPostsService().update(
    { original_post_id: req.body.post_id, poster_id: req.user.user_id },
    { original_post_isVisible: false }
  );
  const updatedRePost = await new RePostsService().update(
    { post_id: req.body.post_id, poster_id: req.user.user_id },
    { original_post_isVisible: false }
  );
  const updatedTweetsPost = await new TweetPostsService().update(
    { post_id: req.body.post_id, poster_id: req.user.user_id },
    { original_post_isVisible: false }
  );

  const updatedBlockedPost = await new BlockedPostsService().update(
    { post_id: req.body.post_id, poster_id: req.user.user_id },
    { original_post_isVisible: false }
  );
 const updatedbasePost = await new PostsService().update(
            { post_id: req.user.user_id, post_id: req.query.post_id },
            { is_visible: false }
          );
          return createResponse(resmessage, updatedbasePost)(
            res,
            HTTP.OK
          );
    }
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
