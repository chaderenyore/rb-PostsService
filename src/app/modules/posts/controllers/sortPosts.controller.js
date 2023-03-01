const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const PostService = require("../services/posts.services");
const CommunityPostsService = require("../services/communityPosts.services");
const RePostsService = require("../services/repost.services");
const TweetPostsService = require("../services/tweets.services");
const logger = require("../../../../../logger.conf");

exports.sortPosts = async (req, res, next) => {
  try {
    // containers of data to be returned
    let posts;
    // check for type of paots to be sorted
    if(req.query.post_type === 'myposts'){
        let sortCondition = {
            poster_id: req.user.user_id,
            created_at: {
              $gte: req.body.start_date,
              $lt: req.body.end_date,
            },
          }
         posts = await new PostsService().all(
            req.query.limit,
            req.query.page,
            sortCondition
          );
    }
    if(req.query.post_type === 'community'){
        let sortCondition = {
            created_at: {
              $gte: req.body.start_date,
              $lt: req.body.end_date,
            },
          }
            posts = await new CommunityPostsService().all(
            req.query.limit,
            req.query.page,
            sortCondition
          );
    }
    if(req.query.post_type === 'myreposts'){
        let sortCondition = {
            reposter_id: req.user.user_id,
            created_at: {
              $gte: req.body.start_date,
              $lt: req.body.end_date,
            },
          }
         posts = await new RePostsService().all(
            req.query.limit,
            req.query.page,
            sortCondition
          );
    }
    if(req.query.post_type === 'mytweets'){
        let sortCondition = {
            twiter_id:req.user.user_id, 
            created_at: {
              $gte: req.body.start_date,
              $lt: req.body.end_date,
            },
          }
         posts = await new TweetPostsService().all(
            req.query.limit,
            req.query.page,
            sortCondition
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
      return createResponse(`Posts Sorted`, posts)(res, HTTP.OK);
    }
  } catch (err) {
    logger.error(err);

    return next(createError.InternalServerError(err));
  }
};
