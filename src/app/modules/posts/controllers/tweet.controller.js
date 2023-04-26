const axios = require("axios").default;
const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const PostsService = require("../services/posts.services");
const CommunityPostsService = require("../services/communityPosts.services");
const TweetsService = require("../services/tweets.services");
const KEYS = require("../../../../_config/keys");
const logger = require("../../../../../logger.conf");

exports.tweetAPost = async (req, res, next) => {
  try {
    // search if usr owns post
    const post = await new PostsService().findAPost({
      community_id: req.body.community_id,
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
      const user = await axios.get(
        `${KEYS.USER_SERVICE_URI}/users/v1/user/${req.user.user_id}?platform=web`,
        {
          headers: {
            Authorization: `Bearer ${req.token}`,
          },
        }
      );
      if (user && user.data && user.data.code === 200) {
        let fullname;
        if (user.data.data.first_name && user.data.data.first_name !== " ") {
          firstname = user.data.data.first_name;
          fullname = firstname;
        }
        if (user.data.data.last_name && user.data.data.last_name !== " ") {
          firstname = user.data.data.first_name;
          fullname = `${firstname} ${user.data.data.last_name}`;
        }
        // save to community
        const dataToCommunityPostModel = {
          poster_id: req.user.user_id,
          original_post_id: post._id,
          reposter_id: req.user.user_di,
          post_title: req.body.tweet_title || "",
          post_body_text: req.body.tweet_body_text || "",
          post_type: "tweet",
          poster_image: user.data.data.image ? user.data.data.image : "",
          poster_username: user.data.data.username
            ? user.data.data.username
            : "",
          poster_fullname:fullname,
          post_child: post,
        };
        const communityPost = await new CommunityPostsService().create(
          dataToCommunityPostModel
        );
        if(communityPost){
        //  save to users repost
        const dataToTweetModel = {
          community_id: communityPost._id,
          poster_id: post.poster_id,
          post_id: post._id,
          poster_fullname: fullname,
          twiter_id: req.user.user_id,
          tweet_title: req.body.tweet_title,
        };
        const Tweet = await new TweetsService().create(dataToTweetModel);
        // save post to post model for reference
        const dataToPostModel = {
          community_id: communityPost._id,
          poster_id: req.user.user_id,
          original_post_id: post._id,
          reposter_id: req.user.user_di,
          post_title: req.body.resposted_title,
          post_type: "tweet",
          poster_image: user.data.data.image ? user.data.data.image : "",
          poster_username: user.data.data.username
            ? user.data.data.username
            : "",
          post_child: post,
        };
        const referencePost = await new PostsService().create(dataToPostModel);
        // increment number or repost on original post
        const originalBasePost = await new PostsService().update(
          { community_id: req.body.community_id },
          { $inc: { 'total_posts_tweets': 1 } }
        );
        const originalComunityPost = await new CommunityPostsService().update(
          { _id: req.body.community_id },
          { $inc: { 'total_posts_tweets': 1 } }
        );
        return createResponse("You Tweeted A Post", referencePost)(
          res,
          HTTP.OK
        );
        }else {
          return next(
            createError(HTTP.OK, [
              {
                status: RESPONSE.SUCCESS,
                message: "Unexpected Error",
                statusCode: HTTP.OK,
                data: null,
                code: HTTP.OK,
              },
            ])
          );
        }
      }
    }
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
