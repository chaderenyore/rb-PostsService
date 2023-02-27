const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const PostsService = require("../services/posts.services");
const CommunityPostsService = require("../services/communityPosts.services");
const logger = require("../../../../../logger.conf");

exports.updatePostMedia = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(
        createError(HTTP.BAD_REQUEST, [
          {
            status: RESPONSE.ERROR,
            message: "Please specify a file to upload.",
            statusCode: HTTP.BAD_REQUEST,
            data: null,
            code: HTTP.BAD_REQUEST,
          },
        ])
      );
    } else {
       // build data to send
  let dataToUpdate;
  let media;
  if(req.query.type === "video"){
    dataToUpdate = {
      { post_video: req.file?.location }
    };
    media = {
      { post_video: req.file?.location } 
    };
  }
  if(req.query.type === "image"){
    dataToUpdate = {
      { post_image: req.file?.location }
    };
    media = {
      { post_image: req.file?.location } ;
    }
  }
  // update post and community posts
  await new CommunityPostsService().update(
    { original_post_id: req.body.post_id, poster_id: req.user.user_id },
    dataToUpdate
  )
  await new PostsService().update(
      { poster_id: req.user.user_id, post_id: req.body.post_id },
      dataToUpdate
    );
    return createResponse("Post Media Uploaded", { media: req.file?.location })(
      res,
      HTTP.OK
    );
  } catch (err) {
    }
 
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
