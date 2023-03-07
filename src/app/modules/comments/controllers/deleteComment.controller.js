const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const PostsService = require("../../posts/services/posts.services");
const CommunityPostsService = require("../../posts/services/communityPosts.services");
const RepostService = require("../../posts/services/repost.services");
const TweetService = require("../../posts/services/tweets.services");
const CommentService = require("../services/comments.services");


const logger = require("../../../../../logger.conf");

exports.deleteComment = async (req, res, next) => {
  try {
    // check if comment exists/user owns the comment
      const comment = await new CommentService().findAComment(
        {_id: req.query.comment_id, commenter_id: req.user.user_id}
      );
      if (!comment) {
        return next(
          createError(HTTP.BAD_REQUEST, [
            {
              status: RESPONSE.ERROR,
              message: "This Comment Does Not Exist",
              statusCode: HTTP.BAD_REQUEST,
              data: {},
              code: HTTP.BAD_REQUEST,
            },
          ])
        );
      } else {
           // check if post exist
     const post = await new PostsService().findAPost({_id:comment.post_id});
     if(post){
      const deletedComment = await new CommentService().deletOne({_id: req.query.comment_id});
      console.log("deleted COmment =========== " , deletedComment);
      // update community
      const updatedCommunity = await new CommunityPostsService().update(
        { original_post_id: comment.post_id },
        { $inc: { 'total_comments': -1 } }
      )
         if(post.post_type === "tweet"){
          // update tweet model
          const updatedTweet = await new TweetService().update(
            { post_id: comment.post_id },
            { $inc: { 'total_comments': -1 } }
          )
          // Real time update frontend
         }
         if(post.post_type === "repost"){
          // update repost model comment count
          const updatedRepost = await new RepostService().update(
            { post_id: comment.post_id },
            { $inc: { 'total_comments': -1 } }
          )
         }
        //  update post model
        const updatedPost = await new PostsService().update(
          { _id: comment.post_id },
          { $inc: { 'total_comments': -1 } }
        );
      return createResponse(`Comment Deleted`, deletedComment)(res, HTTP.OK);
     } else {
      return next(
        createError(HTTP.BAD_REQUEST, [
          {
            status: RESPONSE.ERROR,
            message: "This Post Does Not Exist",
            statusCode: HTTP.BAD_REQUEST,
            data: {},
            code: HTTP.BAD_REQUEST,
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
