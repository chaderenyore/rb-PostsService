const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const PostsService = require("../services/posts.services");
const CommunityPostsService = require("../services/communityPosts.services");
const RePostsService = require("../services/repost.services");
const TweetPostsService = require("../services/tweets.services");
const logger = require("../../../../../logger.conf");

exports.getAUsersPosts = async (req, res, next) => {
  try {
   // containers of data to be returned
   let posts;
   // check for type of paots to be sorted
   if(req.query.post_type === 'myposts'){
    let tracker = true;
    // get all users posts
    while(tracker){
      let queryData = {
        $or: [
          { poster_id: String(req.user.user_id)},
          { reposter_id: String(req.user.user_id)},
          { twiter_id: String(req.user.user_id)},
        ],
         }
        posts = await new CommunityPostsService().all(
           req.query.limit,
           req.query.page,
           queryData
         );
         if(post.data.length === 0){
          tracker = false;
         }
    }

   }
   if(req.query.post_type === 'myreposts'){
       let queryData = {
           reposter_id: req.user.user_id,
         }
        posts = await new RePostsService().all(
           req.query.limit,
           req.query.page,
           queryData
         );
   }
   if(req.query.post_type === 'mytweets'){
       let queryData = {
           twiter_id:req.user.user_id, 
           created_at: {
             $gte: req.body.start_date,
             $lt: req.body.end_date,
           },
         }
        posts = await new TweetPostsService().all(
           req.query.limit,
           req.query.page,
           queryData
         );
   }
   if (posts && posts.data && posts.data.length === 0) {
     return next(
       createError(HTTP.OK, [
         {
           status: RESPONSE.SUCCESS,
           message: "No Posts Found",
           statusCode: HTTP.OK,
           data: {},
           code: HTTP.OK,
         },
       ])
     );
   } else {
    // filter banned posts
      return createResponse(`Posts Retrieved`, posts)(res, HTTP.OK);
    }
  } catch (err) {
    logger.error(err);

    return next(createError.InternalServerError(err));
  }
};
