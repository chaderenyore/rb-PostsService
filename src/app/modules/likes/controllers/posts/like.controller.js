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
        community_id: req.query.community_id,
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
      } else {
        // search if Post Exists
      const post = await new PostsService().findAPost({ community_id: req.query.community_id});
      if(post){
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
            if(user.data.data.first_name && user.data.data.first_name !== " "){
             firstname = user.data.data.first_name;
             fullname = firstname;
            }
            if(user.data.data.last_name && user.data.data.last_name !== " "){
             firstname = user.data.data.first_name
             fullname = `${firstname} ${user.data.data.last_name}`
            }
            //  save to users repost
            const dataToLikeModel = {
              community_id: post.community_id,
              user_id: req.user.user_id,
              fullname: fullname || "",
              username: user.data.data.username ? user.data.data.username : "",
              user_image: user.data.data.image ? user.data.data.image : "",
            };
          
            const Like = await new PostLikeService().createRecord(dataToLikeModel);
            // increment like count on post
            const updatedCommunityPost = await new CommunityService().update(
              { community_id: req.query.community_id },
              { $inc: { 'total_likes': 1 } }
            );
    
            const updatedPost = await new PostsService().update(
              { community_id: req.query.community_id },
              { $inc: { 'total_likes': 1 } }
            );
            // check if post liked is a tweet or repost and update respectively
            if (post.post_type === "tweet") {
              const updatedTweet = await new TweetService().update(
                { community_id: req.query.community_id },
                { $inc: { 'total_likes': 1 } }
              );
            }
            if (post.post_type === "repost") {
              const updatedRePost = await new RepostService().update(
                { community_id: req.query.community_id },
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
      } else{
        return next(
          createError(HTTP.OK, [
            {
              status: RESPONSE.SUCCESS,
              message: "Broken flow for Post Likes",
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
