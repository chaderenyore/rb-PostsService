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
    const channel = await PostDetailsConsumer.getChannel();
    if (msg !== null) {
      const message = msg.content.toString();
      console.info(` [x] Consumed : ${message}`);

      const { id, bodyData } = JSON.parse(message);

      try {
        //    update records here
        if (bodyData.imageUrl) {
          await new CommunityService().updateMany(
            { poster_id: id },
            { poster_image: bodyData.imageUrl }
          );
          await new PostDetailsService().updateMany(
            { poster_id: id },
            { poster_image: bodyData.imageUrl }
          );
          return channel.ack(msg);
        } else {
          if (bodyData.fullName && !bodyData.username) {
            await new CommunityService().updateMany(
              { poster_id: id },
              { poster_fullname: bodyData.fullName }
            );
            await new PostDetailsService().updateMany(
              { poster_id: id },
              { poster_fullname: bodyData.fullName }
            );
            return channel.ack(msg);
          }
          if (bodyData.username && !bodyData.fullName) {
            await new CommunityService().updateMany(
              { poster_id: id },
              { poster_username: bodyData.username }
            );
            await new PostDetailsService().updateMany(
              { poster_id: id },
              { poster_username: bodyData.username }
            );
            return channel.ack(msg);
          }
          if (bodyData.fullName && bodyData.username) {
            await new CommunityService().updateMany(
              { poster_id: id },
              {
                poster_username: bodyData.username,
                poster_fullname: bodyData.fullName,
              }
            );
            await new PostDetailsService().updateMany(
              { poster_id: id },
              {
                poster_username: bodyData.username,
                poster_fullname: bodyData.fullName,
              }
            );
            return channel.ack(msg);
          }
        }
      } catch (error) {
        console.error(`Error while updating post details: ${error}`);
        return channel.ack(msg);
      }
    }
    process.on("exit", (code) => {
      channel.close();
      console.log(`Closing ${channel} channel`);
    });
    // return null;
  }
);

module.exports = PostDetailsConsumer;
