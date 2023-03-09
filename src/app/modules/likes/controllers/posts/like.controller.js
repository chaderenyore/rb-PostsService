const axios = require("axios").default;
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
const KEYS = require("../../../../../_config/keys");

exports.likeAPost = async (req, res, next) => {
  try {
      // check if like exists
      const likeExist = await new PostLikeService().findARecord({
        post_id: req.query.original_post_id,
        user_id: req.user.user_id,
      });
      if (likeExist) {
        return next(
          createError(HTTP.OK, [
            {
              status: RESPONSE.SUCCESS,
              message: "You Have ALready Liked This Post",
              statusCode: HTTP.OK,
              data: null,
              code: HTTP.OK,
            },
          ])
        );
      }
    // search if user owns post
    const post = await new PostsService().findAPost({
      _id: req.query.original_post_id,
    });
    console.log("POSTS =================== ", post)
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
          post_id: post._id,
          user_id: req.user.user_id,
          fullname: fullname || "",
          username: user.data.data.username ? user.data.data.username : "",
          user_image: user.data.data.image ? user.data.data.image : "",
        };
      
        const Like = await new PostLikeService().createRecord(dataToLikeModel);
        // increment like count on post
        const updatedCommunityPost = await new CommunityService().update(
          { original_post_id: req.query.original_post_id },
          { $inc: { 'total_likes': 1 } }
        );

        const updatedPost = await new PostsService().update(
          { _id: req.query.original_post_id },
          { $inc: { 'total_likes': 1 } }
        );
        // check if post liked is a tweet or repost and update respectively
        if (post.post_type === "tweet") {
          const updatedTweet = await new TweetService().update(
            { post_id: req.query.original_post_id },
            { $inc: { 'total_likes': 1 } }
          );
        }
        if (post.post_type === "repost") {
          const updatedRePost = await new RepostService().update(
            { post_id: req.query.original_post_id },
            { $inc: { 'total_likes': 1 } }
          );
        }

        return createResponse("You Liked A Post", Like)(res, HTTP.OK);
      } else {
        return next(
          createError(HTTP.OK, [
            {
              status: RESPONSE.SUCCESS,
              message: "Something Is Not Right Try AGain",
              statusCode: HTTP.OK,
              data: null,
              code: HTTP.OK,
            },
          ])
        );
      }
    }
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
