const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const PostsService = require("../services/posts.services");
const CommunityPostsService = require("../services/communityPosts.services");
const RePostsService = require("../services/repost.services");
const TweetPostsService = require("../services/tweets.services");
const logger = require("../../../../../logger.conf");

exports.updatePostInfo = async (req, res, next) => {
  try {
    // check if same parameters where inputed
    if (Object.entries(req.body).length > 0 === false) {
      return next(
        createError(HTTP.BAD_REQUEST, [
          {
            status: RESPONSE.ERROR,
            message: "No Fields Marked For Update",
            statusCode: HTTP.BAD_REQUEST,
            data: {},
            code: HTTP.BAD_REQUEST,
          },
        ])
      );
    } else {
      // fetch post and compare titles and body text
      const post = await new PostsService().findAPost({_id: req.query.post_id, poster_id: req.user.user_id});
      console.log("POST ============= ", post);
      if(!post){
        return next(
          createError(HTTP.OK, [
            {
              status: RESPONSE.SUCCESS,
              message: "Post Does Not Exist",
              statusCode: HTTP.OK,
              data: {},
              code: HTTP.OK,
            },
          ])
        );
      }
      if(post.post_body_text === req.body.post_body_text || post.post_title === req.body.post_title){
        return next(
          createError(HTTP.OK, [
            {
              status: RESPONSE.SUCCESS,
              message: "Title or Body is same with current change",
              statusCode: HTTP.OK,
              data: {},
              code: HTTP.OK,
            },
          ])
        );
      } else {
        const dataToUpdatePost = {
          was_edited: true,
          ...req.body,
        };
        const updatedPost = await new PostsService().update(
          { _id: req.query.post_id, poster_id: req.user.user_id },
          dataToUpdatePost
        );
        if (!updatedPost) {
          return next(
            createError(HTTP.OK, [
              {
                status: RESPONSE.SUCCESS,
                message: "Post Does Not Exist/UnAuthorised",
                statusCode: HTTP.Ok,
                data: {},
                code: HTTP.Ok,
              },
            ])
          );
        } else {
          //  update community posts
          const dataToUpdateCommunity = {
            was_edited: true,
            ...req.body,
          };
          const postInCommunity = await new CommunityPostsService().update(
            { original_post_id: req.query.post_id, poster_id: req.user.user_id },
            dataToUpdateCommunity
          );
          return createResponse(`Post Updated`, updatedPost)(res, HTTP.OK);
        }
      }
      }
 
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
