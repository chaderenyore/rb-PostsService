const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const PostsService = require("../services/posts.services");
const CommunityPostsService = require("../services/communityPosts.services");
const RePostsService = require("../services/repost.services");
const logger = require("../../../../../logger.conf");

exports.repost = async (req, res, next) => {
  try {
    // search if usr owns post
    const post = await new PostsService().findAPost({_id:req.body.original_post_id});
    if (!post) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "This Post Does Not Exist",
            statusCode: HTTP.OK,
            data: null,
            code: HTTP.OK,
          },
        ])
      );
    } else {
    // Get user Info creating post
    const user = await axios.post(
        `${KEYS.USER_SERVICE_URI}/users/v1/user/${req.user.user_id}?platform=web`,
        {
          headers: {
            Authorization: `Bearer ${req.token}`,
          },
        }
      );
if(user && user.data && user.data.code === 200 ){
   //  save to users repost
const dataToRePostModel = {
    poster_id: post.poster_id,
    post_id: post._id,
    reposter_id: req.user.user_id,
    repposted_title: req.body.resposted_title,
}
const RePost = await new RePostsService().create(dataToRePostModel);
// save to community
const dataToCommunityPostModel = {
    poster_id: post.poster_id,
    original_post_id: post._id,
    reposter_id: req.user.user_di,
    post_title: req.body.resposted_title,
    post_type: "repost",
    poster_image: user.data.data.image ? user.data.data.image : "",
    poster_username: user.data.data.username ? user.data.data.username : "",
}
const communityPost = await new CommunityPostService().create(dataToCommunityPostModel);
// add child property to repost
    Repost.child = post;
          return createResponse("You Successfully Reposted A Post", RePost)(
            res,
            HTTP.OK
          );
    }
} else {
    return next(
      createError(HTTP.BAD_REQUEST, [
        {
          status: RESPONSE.ERROR,
          message: "Unable To Re Post, Try Again",
          statusCode: HTTP.BAD_REQUEST,
          data: null,
          code: HTTP.BAD_REQUEST,
        },
      ])
    );
  }

  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
