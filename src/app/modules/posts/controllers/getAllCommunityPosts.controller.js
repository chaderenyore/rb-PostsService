const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const PostsService = require("../services/posts.services");
const TweetsService = require("../services/tweets.services");
const RepostService = require("../services/reposts.services");
const BlockedPostsService = require("../services/blockedPost.services");


const logger = require("../../../../../logger.conf");

exports.getAllCommunityPostPosts = async (req, res, next) => {
  try {
    // Container for allposts retrieved
    const allPosts = [];
    const usersBlockedPostsIds = [];
    // search for posts
    const posts = await new PostsService().getAll(req.query.limit, req.query.page, {});
    if (posts.data.length === 0) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.ERROR,
            message: "No Community Posts At The Moment",
            statusCode: HTTP.OK,
            data: {},
            code: HTTP.OK,
          },
        ])
      );
    } else {
      // add posts to data object
      allPosts.push(posts.data);
      // search for tweets ansd add to data object
   const tweets = await new TweetsService().getAll(req.query.limit, req.query.page, {});
   if(tweets.data.length !== 0){
       allPosts.push(tweets.data);
   }
  //  search for all reposted posts and add to data object
  const reposted = await new RepostService().getAll(req.query.limit, req.query.page, {})
  if(reposted.data.length !== 0){
    allPosts.push(tweets.data);
 }
//  get users blocked posts ids
 const blockedPost = await new BlockedPostsService().getAll(req.query.limit, req.query.page, {blocker_id: req.user.user_id});
 if(blockedPost.data.length !== 0){
       //  store blocked postsids
   for(let i; i < blockedPost.data.length; i++){
    usersBlockedPostsIds.push(blockedPost.data[i]._id);
   }
 }
   // filter visible and user blocked posts
    let filteredPostsArray = [];
    for(let post; j < allPosts.length; post++ ){
        if(allPosts.)
    }
      return createResponse(`Posts`, posts)(res, HTTP.OK);
    }
  } catch (err) {
    logger.error(err);

    return next(createError.InternalServerError(err));
  }
};
