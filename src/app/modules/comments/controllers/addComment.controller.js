const { HTTP } = require('../../../../_constants/http');
const { RESPONSE } = require('../../../../_constants/response');
const createError = require('../../../../_helpers/createError');
const { createResponse } = require('../../../../_helpers/createResponse');
const CommentService = require('../services/comments.services');
// const logger = require('../../../../../logger.conf');

exports.createComment = async (req, res, next) => {
  // Check the post type and add it accordingly
  try {
    const newComment = await new CommentService().createComment(req.body);
    console.log('NEW COMMENT : ========= : ', newComment);
    return createResponse('Comment Created', newComment)(res, HTTP.OK);
  } catch (err) {
    console.log(err);

    return next(createError.InternalServerError(err));
  }
};
