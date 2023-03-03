const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const PostsService = require("../services/posts.services");
const CommunityPostsService = require("../services/communityPosts.services");
const RePostsService = require("../services/repost.services");
const TweetPostsService = require("../services/tweets.services");
const BlockedPostsService = require("../services/blockedPost.services");
const BannedPostsService = require("../services/bannedPosts.services");
const logger = require("../../../../../logger.conf");

exports.bannPosts = async (req, res, next) => {
  try {
    let deletedPosts = [];
    // get the array of ids from the body
    const { ids } = req.body;
    // loop through idss and delete from community while adding to banned posts and user's posts
    for (let i = 0; i < ids.length; i++) {
      // future implementation
      // search for posts and if report count exceed a certain value ,delete
      // check if post exist
      console.log("IDS ============ ", ids[0]);
      const post = await new PostsService().findAPost({_id: ids[i]});
      if(!post){
        return next(
          createError(HTTP.OK, [
            {
              status: RESPONSE.SUCCESS,
              message: `Id At Position ${i} is Invalid`,
              statusCode: HTTP.Ok,
              data: {},
              code: HTTP.Ok,
            },
          ])
        );
      }
      deletedPosts.push(post);
      // search for posts in community and delete
      const deletedPost = await new CommunityPostsService().deletOne({
        original_post_id: ids[i],
      });
      console.log("DELETED COMMUNITY PPOSTS ===" , deletedPost)
      //delete from users posts
      const deletedUserPosts = await new PostsService().deleteOne({
        _id: ids[i],
      });
      // update tweets and reposted
      const updatedRePost = await new RePostsService().update(
        { post_id: ids[i] },
        { original_is_banned: true }
      );
      const updatedTweetsPost = await new TweetPostsService().update(
        { post_id: ids[i] },
        { original_is_banned: true }
      );

      const updatedBlockedPost = await new BlockedPostsService().update(
        { post_id: ids[i] },
        { original_is_banned: true }
      );
      //    save to banned posts
      const bannedPost = await new BannedPostsService().create({
        ...post,
      });
      console.log(bannedPost)
    }
    return createResponse("Posts Banned", deletedPosts)(
      res,
      HTTP.OK
    );
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
