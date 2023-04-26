const { Connnection } = require("../index");
const KEYS = require("../../_config/keys");
const PostsLiksService = require("../../app/modules/likes/services/postLikes.services");

const PostsLikesConsumer = new Connnection(
  KEYS.AMQP_URI,
  KEYS.UPDATE_USER_POST_LIKE_DETAILS,
  async (msg) => {
    const channel = PostsLikesConsumer.getChannel();
    if (msg !== null) {
      const message = msg.content.toString();
      console.info(` [x] Consumed : ${message}`);

      const { id, bodyData } = JSON.parse(message);

      try {
        //    update records here
        if (bodyData.imageUrl) {
          const updatedrecords = await new PostsLiksService().updateMany(
            { user_id: id },
            { user_image: bodyData.imageurl }
          );

          return channel.ack(msg);
        }
      } catch (error) {
        console.error(`Error while updating post likes details: ${error}`);
        return channel.ack(msg);
      }
    }

    return null;
  }
);

module.exports = PostsLikesConsumer;
