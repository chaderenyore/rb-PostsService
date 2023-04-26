const { Connnection } = require("../index");
const KEYS = require("../../_config/keys");
const CommentLikesServiceService = require("../../app/modules/likes/services/commentLikes.services");

const CommentLikesConsumer = new Connnection(
  KEYS.AMQP_URI,
  KEYS.UPDATE_USER_POST_COMMENTS_LIKES_DETAILS,
  async (msg) => {
    const channel = CommentLikesConsumer.getChannel();
    if (msg !== null) {
      const message = msg.content.toString();
      console.info(` [x] Consumed : ${message}`);

      const { id, bodyData } = JSON.parse(message);
      console.log("BODY DATA ====== ", bodyData);
      try {
        //    update records here
        if (bodyData.imageUrl) {
          const updatedrecords =
            await new CommentLikesServiceService().updateMany(
              { user_id: id },
              { user_image: bodyData.imageUrl }
            );
          return channel.ack(msg);
        }
      } catch (error) {
        console.error(`Error while updating comment likes: ${error}`);
        return channel.ack(msg);
      }
    }

    return null;
  }
);

module.exports = CommentLikesConsumer;
