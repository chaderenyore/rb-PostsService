const { HTTP } = require('../../../../_constants/http');
const { RESPONSE } = require('../../../../_constants/response');
const createError = require('../../../../_helpers/createError');
const { createResponse } = require('../../../../_helpers/createResponse');
const PostsService = require('../../posts/services/posts.services');
const CommentService = require('../services/comments.services');

exports.getComment = async (req, res, next) => {
  //Search if the post exist.
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

  //Ask the repository for the comments of the posts
  const comments = await new CommentService().GetAllComments(
    req.query.limit,
    req.query.page,
    {
      post_id: req.query.post_id,
    }
  );

  if (comments && comments.data.length === 0) {
    return next(
      createError(HTTP.OK, [
        {
          status: RESPONSE.SUCCESS,
          message: 'No Comments Yet',
          statusCode: HTTP.OK,
          data: {},
          code: HTTP.OK,
        },
      ])
    );
  } else {
    //return the paginated comments
    return createResponse(`Posts Retrieved`, posts)(res, HTTP.OK);
  }
};
