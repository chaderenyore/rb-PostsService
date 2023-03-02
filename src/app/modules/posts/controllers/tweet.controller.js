const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const PostsService = require("../services/posts.services");
const CommunityPostsService = require("../services/communityPosts.services");
const TweetsService = require("../services/tweets.services");
const logger = require("../../../../../logger.conf");

exports.tweetAPost = async (req, res, next) => {
  try {
    // search if usr owns post
    const post = await new PostsService().findAPost({
      _id: req.body.original_post_id,
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
        const dataToTweetModel = {
          poster_id: post.poster_id,
          post_id: post._id,
          twiter_id: req.user.user_id,
          tweet_title: req.body.tweet_title,
        };
        const Tweet = await new TweetsService().create(dataToTweetModel);
        // save to community
        const dataToCommunityPostModel = {
          poster_id: post.poster_id,
          original_post_id: post._id,
          reposter_id: req.user.user_di,
          post_title: req.body.resposted_title,
          post_type: "tweet",
          poster_image: user.data.data.image ? user.data.data.image : "",
          poster_username: user.data.data.username
            ? user.data.data.username
            : "",
        };
        const communityPost = await new CommunityPostsService().create(
          dataToCommunityPostModel
        );
        // add child property to tweet
        Tweet.child = post;
        // save post to post model for reference
        const dataToPostModel = {
          poster_id: post.poster_id,
          original_post_id: post._id,
          reposter_id: req.user.user_di,
          post_title: req.body.resposted_title,
          post_type: "tweet",
          poster_image: user.data.data.image ? user.data.data.image : "",
          poster_username: user.data.data.username
            ? user.data.data.username
            : "",
          post_child: post
        }
        const referencePost = await new PostsService().create(dataToPostModel);
        return createResponse("You Tweeted A Post", Tweet)(res, HTTP.OK);
      }
    }
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
