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
    let allPosts = [];
    let filterPosts = [];
    let usersBlockedPostsIds = [];
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
      console.log("COMMUNITY POSTS ================= ", posts);
      // console.log("COMMUNITY POSTS ================= ", posts.data);
      // console.log("COMMUNITY POSTS ================= ", posts.data.length);
    // get users blocked posts ids
    const usersBlockedPosts = await new BlockedPostsService().getAll({blocker_id: req.user.user_id});
    // console.log("User Blocked Post ============= ", usersBlockedPosts);
    console.log("User Blocked Post ============= ", usersBlockedPosts.data);

    for(let i = 0; i < usersBlockedPosts.data.length; i++){
      usersBlockedPostsIds.push(usersBlockedPosts.data[i].post_id)
    }
  //  loop through data and find the one that has children
  for(let post = 0; post < posts.data.length; post++){
    if(!usersBlockedPostsIds.includes(posts.data[post].original_post_id)){
      allPosts.push(posts.data[post]);
    }
  }
  console.log("ALL POSTS ================= ", allPosts);
  for(let post = 0; post < allPosts.length; post++){
    if(allPosts[post].post_type === "original"){
      filterPosts.push(allPosts[post]);
    }
    if(allPosts[post].post_type === "tweet" || allPosts[post].post_type === "repost"  || allPosts[post].post_type === "shared"){
      // find origianl post
      const originalPost = await new PostsService().findAPost({_id: allPosts[post].original_post_id});
      if(originalPost && originalPost.is_visible === false){
      allPosts[post].originalPost = "Original Post Visibility off";
      filterPosts.push(allPosts[post]);
      } else{
        allPosts[post].originalPost = originalPost;
        filterPosts.push(allPosts[post]);
      }
    }
  }
  // build data to return
  data.filterPosts = filterPosts;
  data.pagination = posts.pagination;
  // reduce data total count by number of blocked posts removed
  data.pagination.totalCount = Number(posts.pagination.totalCount) - Number(usersBlockedPosts.pagination.totalCount);
      return createResponse("Community Posts Retrieved", data)(res, HTTP.OK);
    }
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
