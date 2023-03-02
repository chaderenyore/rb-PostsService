const { HTTP } = require('../../../../_constants/http');
const { RESPONSE } = require('../../../../_constants/response');
const createError = require('../../../../_helpers/createError');
const { createResponse } = require('../../../../_helpers/createResponse');
const PostsService = require("../../posts/services/posts.services");

exports.getPostComments = async(req, res, next) => {
  try {
    
  } catch(err) {
    console.log(err);

    return next(createError.InternalServerError(err));
  }
}