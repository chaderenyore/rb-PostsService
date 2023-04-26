const { Connnection } = require("../index");
const KEYS = require("../../_config/keys");
const PostCommentsService = require("../../app/modules/comments/services/comments.services");

const PostCommentConsumer = new Connnection(
  KEYS.AMQP_URI,
  KEYS.UPDATE_USER_POST_COMMENT_DETAILS,
  async (msg) => {
    const channel = PostCommentConsumer.getChannel();
    if (msg !== null) {
      const message = msg.content.toString();
      console.info(` [x] Consumed : ${message}`);

      const { id, bodyData } = JSON.parse(message);

      try {
        //    update records here
        if (bodyData.imageUrl) {
          const updatedrecords = await new PostCommentsService().updateMany(
            { commenter_id: id },
            { commenter_image: bodyData.imageUrl }
          );

          return channel.ack(msg);
        }
      } catch (error) {
        console.error(`Error while updating post comment: ${error}`);
        return channel.ack(msg);
      }
    }

    return null;
  }
);

module.exports = PostCommentConsumer;
