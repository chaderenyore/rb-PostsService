const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const PostsService = require("../services/posts.services");
const CommunityPostsService = require("../services/communityPosts.services");
const BlockedPostsService = require("../services/blockedPost.services");

const logger = require("../../../../../logger.conf");

exports.getAllCommunityPostPosts = async (req, res, next) => {
  try {
    // Container for allposts retrieved
    let data= {};
    const allPosts = [];
    const usersBlockedPostsIds = [];
    // search for posts
    const posts = await new CommunityPostsService().getAll(req.query.limit, req.query.page, {});
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
    // get users blocked posts ids
    const usersBlockedPosts = await new BlockedPostsService().find({blocker_id: req.user.user_id})
    for(let ids; ids < usersBlockedPosts.length; ids++){
      usersBlockedPostsIds.push(usersBlockedPosts.post_id[ids])
    }
  //  loop through data and find the one that has children
  for(let post; post < posts.data.length; post++){
    if(!usersBlockedPostsIds.includes(posts.data[post].post_id)){
      allPosts.push(posts.data[post]);
    }
    if(post.data[post].post_type === "tweet" || post.data[post].post_type === "repost"  || post.data[post].post_type === "shared"){
      // find origianl post
      const originalPost = await new PostsService().findAPost({_id: post.data[post].original_post_id});
      if(originalPost && originalPost.is_visible === false){
      post.data[post].originalPost = "Original Post Visibility off";
      allPosts.push(post.data[post]);
      } else{
        post.data[post].originalPost = originalPost;
        allPosts.push(post.data[post]);
      }
    }
  }
  // build data to return
  data.allPosts = allPosts;
  data.pagination = posts.pagination;
      return createResponse("Community Posts Retirived", data)(res, HTTP.OK);
    }
  } catch (err) {
    logger.error(err);

    return next(createError.InternalServerError(err));
  }
};
