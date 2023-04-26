const { Connnection } = require("../index");
const KEYS = require("../../_config/keys");
const PostDetailsService = require("../../app/modules/posts/services/posts.services");
const TweetService = require("../../app/modules/posts/services/tweets.services");
const RepostService = require("../../app/modules/posts/services/repost.services");
const CommunityService = require("../../app/modules/posts/services/communityPosts.services");

const PostDetailsConsumer = new Connnection(
  KEYS.AMQP_URI,
  KEYS.UPDATE_USER_POST_DETAILS,
  async (msg) => {
    const channel = PostDetailsConsumer.getChannel();
    if (msg !== null) {
      const message = msg.content.toString();
      console.info(` [x] Consumed : ${message}`);

      const { id, bodyData } = JSON.parse(message);

      try {
        //    update records here
        if (bodyData.imageUrl) {
          const updatedCommunityRecords =
            await new CommunityService().updateMany(
              { poster_id: id },
              { poster_image: bodyData.imageUrl }
            );
            console.log("Community Posts ====== ", updatedCommunityRecords);
          const updatedPostsRecords = await new PostDetailsService().updateMany(
            { poster_id: id },
            { poster_image: bodyData.imageUrl }
          );

          console.log("Posts ====== ", updatedPostsRecords);

          return channel.ack(msg);
        }
      } catch (error) {
        console.error(`Error while updating post details: ${error}`);
        return channel.ack(msg);
      }
    }

    return null;
  }
);

module.exports = PostDetailsConsumer;
