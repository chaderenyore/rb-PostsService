const { HTTP } = require('../../../../_constants/http');
const { RESPONSE } = require('../../../../_constants/response');
const createError = require('../../../../_helpers/createError');
const { createResponse } = require('../../../../_helpers/createResponse');
const PostsService = require('../../posts/services/posts.services');
const CommunityPostsService = require('../../posts/services/communityPosts.services');
const RepostService = require('../../posts/services/repost.services');
const TweetService = require('../../posts/services/tweets.services');
const CommentService = require('../services/comments.services');

//ceck if the post exist
// find the comment

exports.editComment = async (req, res, next) => {
  try {
    // check if post exist
    const post = new PostsService().findAPost({ _id: req.body.post_id });
    if (!post) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: 'Post Does Not Exist',
            statusCode: HTTP.OK,
            data: {},
            code: HTTP.OK,
          },
        ])
      );
    }
    // check if the user trying to edit is the same as the commenter
    const user = await axios.post(
      `${KEYS.USER_SERVICE_URI}/users/v1/user/${req.user.user_id}?platform=web`,
      {
        headers: {
          Authorization: `Bearer ${req.token}`,
        },
      }
    );

    const comment = new CommentService.findAComment({
      _id: req.body.comment_id,
    });

    if (user.user_id !== comment.commenter_id) {
      return next(
        createError(HTTP.UNAUTHORIZED, [
          {
            status: RESPONSE.SUCCESS,
            message: 'User is not the same person as Commenter',
            statusCode: HTTP.UNAUTHORIZED,
            data: {},
            code: HTTP.UNAUTHORIZED,
          },
        ])
      );
    }

    //Update comment
    const dataToEditCommentModel = {
      commenter_id: req.user.user_id,
      comment_body_text: req.body.comment_body_text,
      post_type: 'comment',
    };

    const updatedComment = await new CommentService().updateAComment(
      {
        _id: req.body.comment_id,
      },
      dataToEditCommentModel
    );

    // Real time update frontend

    return createResponse('Comment Updated', updatedComment)(res, HTTP.OK);
  } catch (err) {
    console.log(err);

    return next(createError.InternalServerError(err));
  }
};
