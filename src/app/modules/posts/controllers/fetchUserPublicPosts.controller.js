const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const PostsService = require("../services/posts.services");
const BlockedPostsService = require("../services/blockedPost.services");

const logger = require("../../../../../logger.conf");

exports.fetchUsersPublicPosts = async (req, res, next) => {
  try {
    // Container for allposts retrieved
    let data= {};
    let allPosts = [];
    let filterPosts = [];
    let usersBlockedPostsIds = [];
    let usersBlockedPosts;
    // search for posts
    const posts = await new PostsService().getAll(req.query.limit, req.query.page, {poster_id: req.query.user_id});
    if (posts && posts.data.length === 0) {
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
      if(req.user) {
   usersBlockedPosts = await new BlockedPostsService().getAll({blocker_id: req.user.user_id});
        for(let i = 0; i < usersBlockedPosts.data.length; i++){
      usersBlockedPostsIds.push(usersBlockedPosts.data[i].post_id)
        }
      }
  //  loop through data and find the one that has children
  for(let post = 0; post < posts.data.length; post++){
    if(!usersBlockedPostsIds.includes(posts.data[post].original_post_id)){
      allPosts.push(posts.data[post]);
    }
  }
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
      console.log("DATA : ", data)
  data.pagination = posts.pagination;
      console.log("POSTS : ",posts)
      console.log("POSTS DATA : ",posts.data)
      console.log("POSTS PAGINATION : ",posts.pagination)
  // reduce data total count by number of blocked posts removed
  let userBlockedPostPagination = (usersBlockedPosts && usersBlockedPosts.length !== 0) ? Number(usersBlockedPosts.pagination.totalCount) : 0
  data.pagination.totalCount = Number(posts.pagination.totalCount) - Number(userBlockedPostPagination);
      return createResponse("User Public Community Posts Retrieved", data)(res, HTTP.OK);
    }
  } catch (err) {
    console.log("Error " , err)
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
