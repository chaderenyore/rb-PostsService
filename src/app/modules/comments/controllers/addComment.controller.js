const axios = require("axios").default;
const { init_pusher } = require("../../../../_events/pusher")
const { HTTP } = require('../../../../_constants/http');
const { RESPONSE } = require('../../../../_constants/response');
const createError = require('../../../../_helpers/createError');
const { createResponse } = require('../../../../_helpers/createResponse');
const PostsService = require("../../posts/services/posts.services");
const CommunityPostsService = require("../../posts/services/communityPosts.services");
const RepostService = require("../../posts/services/repost.services");
const TweetService = require("../../posts/services/tweets.services");
const CommentService = require('../services/comments.services');
const InAppNotificationQueue = require("../../../../_queue/publishers/inAppNotification.publishers");
const KEYS = require("../../../../_config/keys");

// const logger = require('../../../../../logger.conf');

exports.createComment = async (req, res, next) => {
  // Check the post type and add it accordingly
  try {
    // check if post exist
   const post = await new PostsService().findAPost({_id:req.body.post_id});
   if(!post){
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
              firstname = user.data.data.first_name;
             fullname = `${firstname} ${user.data.data.last_name}`
            }
               // create comment
    const dataToCommentModel = {
      post_id: post._id,
      commenter_id: req.user.user_id,
      is_parent: true,
      commenter_image: user.data.data.image ? user.data.data.image : "",
      commenter_fullname: fullname,
      commenter_username: user.data.data.username,
      comment_body_text: req.body.comment_body_text,
      post_type: "comment",
      type: 'original'
    }
    const newComment = await new CommentService().createComment(dataToCommentModel);
    console.log("NEW COMMENT ======== ", newComment);
    // update community
    const updatedCommunity = await new CommunityPostsService().update(
      { original_post_id: req.body.post_id },
      { $inc: { 'total_comments': 1 } }
    )
       if(post.post_type === "tweet"){
        // update tweet model
        const updatedTweet = await new TweetService().update(
          { post_id: req.body.post_id },
          { $inc: { 'total_comments': 1 } }
        )
        // Real time update frontend
       }
       if(post.post_type === "repost"){
        // update repost model comment count
        const updatedRepost = await new RepostService().update(
          { post_id: req.body.post_id },
          { $inc: { 'total_comments': 1 } }
        )
       }

        // publish to InApp Notificaton
        // build data
        const dataToInnAppQueue = {
          user_id: post.poster_id,
          notification_type: 'comment',
          message: `${user.data.data.username} just commented on Your Post`,
          notifier_image:user.data.data.image ? user.data.data.image : "",
          notifier_username: user.data.data.username,
          notifier_fullname: `${fullname}`,
          origin_service: 'Posts',
          origin_platform: req.query.platform
        }
        // publish here
        await InAppNotificationQueue.publishInAppNotifcation(post.poster_id, dataToInnAppQueue);
      // Real time update frontend
      // const pusher = await init_pusher();
      // pusher.trigger("comments", dataToCommentModel);
      //  update post model
      const updatedPost = await new PostsService().update(
        { _id: req.body.post_id },
        { $inc: { 'total_comments': 1 } }
      );
      return createResponse('Comment Created', newComment)(res, HTTP.OK);
   }

          }
 
  } catch (err) {
    console.log(err);

    return next(createError.InternalServerError(err));
  }
};
