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
    // check if the user trying to edit is the same as the poster
    const user = await axios.post(
      `${KEYS.USER_SERVICE_URI}/users/v1/user/${req.user.user_id}?platform=web`,
      {
        headers: {
          Authorization: `Bearer ${req.token}`,
        },
      }
    );

    if(user.user_id !== post.poster_id) {
      return next(
        createError(HTTP.UNAUTHORIZED, [
          {
            status: RESPONSE.SUCCESS,
            message: 'User is not the same person as Poster',
            statusCode: HTTP.UNAUTHORIZED,
            data: {},
            code: HTTP.UNAUTHORIZED,
          },
        ])
      );
    }

    

  } catch (err) {
    console.log(err);

    return next(createError.InternalServerError(err));
  }
};
