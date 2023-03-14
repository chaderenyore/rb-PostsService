const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const PostsService = require("../../posts/services/posts.services");
const CommunityPostsService = require("../../posts/services/communityPosts.services");
const RePostsService = require("../../posts/services/repost.services");
const TweetPostsService = require("../../posts/services/tweets.services");
const BlockedPostsService = require("../../posts/services/blockedPost.services");
const BannedPostsService = require("../../posts/services/bannedPosts.services");
const RecycleBinService = require("../../posts/services/recycleBin.services");

const logger = require("../../../../../logger.conf");

exports.bulkDeletePosts = async (req, res, next) => {
  try {
    let deletedPosts = [];
    // get the array of ids from the body
    const { post_ids } = req.body;
    // loop through idss and delete from community while adding to banned posts and user's posts
    for (let i = 0; i < post_ids.length; i++) {
      // future implementation
      // search for posts and if report count exceed a certain value ,delete
      // check if post exist
      console.log("IDS ============ ", post_ids[i]);
      const post = await new PostsService().findAPost({_id: post_ids[i]});
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
        original_post_id: post_ids[i],
      });
      console.log("DELETED COMMUNITY PPOSTS ===" , deletedPost)
      //delete from users posts
      const deletedUserPosts = await new PostsService().deleteOne({
        _id: post_ids[i],
      });
      // update tweets and reposted
      const updatedRePost = await new RePostsService().update(
        { post_id: post_ids[i] },
        { original_is_deleted: true }
      );
      const updatedTweetsPost = await new TweetPostsService().update(
        { post_id: post_ids[i] },
        { original_is_deleted: true }
      );

      const updatedBlockedPost = await new BlockedPostsService().update(
        { post_id: post_ids[i] },
        { original_is_deleted: true }
      );
      //    save to recyclebin
      const dataToBin = {
        deleted_by: "admin",
        deleter_id: req.user.user_id,
        ...post
      }
    //   save to recycle bin
      const bin = await new RecycleBinService().create(dataToBin);
    }
    return createResponse("Posts Deleted", deletedPosts)(
      res,
      HTTP.OK
    );
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
