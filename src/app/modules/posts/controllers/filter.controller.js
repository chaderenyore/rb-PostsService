const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const CommunityPostsService = require("../services/communityPosts.services");
const logger = require("../../../../../logger.conf");

exports.filterPosts = async (req, res, next) => {
  try {
    // get search params
    let queryParam;
    let ErrorMessage;
    let SuccessMessage;
    if(req.query.poster_username){
      queryParam = {
       poster_username: req.query.poster_username
      };
      SuccessMessage = `All User ${req.query.poster_username} Posts Retreived`;
      ErrorMessage = `This User Has No Post yet`;
    }
    if(req.query.poster_fullname){
      queryParam = {
        poster_fullname : req.query.poster_fullname
      };
      SuccessMessage = `All User ${req.query.poster_fullname} Posts Retreived`;
      ErrorMessage = `This User Has No Post yet`;
    }
    if(req.query.sponsored === "true"){
      queryParam = {
        is_sponsored : true
      };
      SuccessMessage = `All Sponsored Posts Retreived`;
      ErrorMessage = `No Sponsored Posts Yet`;
    }
    if(req.query.sponsored === "false"){
      queryParam = {
        is_sponsored : false
      };
      SuccessMessage = `Fetched Unsponsored Posts`;
      ErrorMessage = `No Unsponsored posts yet`;
    }
    if(req.query.post_type){
      queryParam = {
        post_type: req.query.post_type
      };
      SuccessMessage = `No Posts Of type ${req.query.post_type} found`;
      ErrorMessage = `No Posts of type ${req.query.post_type}`;
    }
    // search
    const posts = await new CommunityPostsService().getAll(req.query.limit, req.query.page, queryParam);
    if (posts.data.length === 0) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: ErrorMessage,
            statusCode: HTTP.OK,
            data: {},
            code: HTTP.OK,
          },
        ])
      );
    } else {
      return createResponse(SuccessMesage, posts)(res, HTTP.OK);
    }
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
