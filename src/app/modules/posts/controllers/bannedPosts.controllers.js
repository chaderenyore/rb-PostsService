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
      const post = await new PostsService().findAPost({ _id: ids[i] });
      if (!post) {
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
      } else {
        console.log("IDS ============ ", ids[0]);
        const deletedUserPosts = await new PostsService().deleteOne({
          _id: String(ids[i]),
        });
        if (deletedUserPosts.acknowledged && deletedPosts.deletedCount >= 1) {
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
        } else {
          // search for posts in community and delete
          const deletedPost = await new CommunityPostsService().deletOne({
            original_post_id: ids[i],
          });
          console.log("DELETED COMMUNITY PPOSTS ===", deletedPost);
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
          const dataToBannedPosts = {
            poster_fullname: post.poster_fullname,
            poster_username: post.poster_username,
            poster_image: post.post_image,
            post_title: post.post_title,
            post_body_text: post.post_body_text,
            post_image: post.post_image,
            post_video: post.post_video,
            total_likes: post.total_likes,
            total_comments: post.total_comments,
            total_times_reposted: post.total_times_reposted,
            total_posts_tweets: post.total_posts_tweets,
            is_sponsored: post.is_sponsored,
            was_edited: post.was_edited,
            is_visible: false,
            is_banned: true,
            is_reported: post.is_reported,
            report_count: post.report_count,
            has_tweets: post.has_tweets,
            has_reposts: post.has_reposts,
          };
          const bannedPost = await new BannedPostsService().create({
            dataToBannedPosts,
          });
          console.log(bannedPost);
          deletedPosts.push(bannedPost);
        }
      }
    }

    return createResponse("Posts Banned", deletedPosts)(res, HTTP.OK);
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
