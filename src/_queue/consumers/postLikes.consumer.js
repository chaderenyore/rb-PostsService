const { Connnection } = require("../index");
const KEYS = require("../../_config/keys");
const PostsLiksService = require("../../app/modules/likes/services/postLikes.services");

const PostsLikesConsumer = new Connnection(
  KEYS.AMQP_URI,
  KEYS.UPDATE_USER_POST_LIKE_DETAILS,
  async (msg) => {
    const channel = await PostsLikesConsumer.getChannel();
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
        } else {
          if (bodyData.fullName && bodyData.user_username) {
            const updatedrecords = await new PostsLiksService().updateMany(
              { user_id: id },
              {
                fullname: bodyData.fullName,
                username: bodyData.username,
              }
            );
            return channel.ack(msg);
          }
          if (bodyData.fullName) {
            const updatedrecords = await new PostsLiksService().updateMany(
              { user_id: id },
              { fullname: bodyData.fullName }
            );
            return channel.ack(msg);
          }
          if (bodyData.username) {
            const updatedrecords = await new PostsLiksService().updateMany(
              { user_id: id },
              { username: bodyData.username }
            );
            return channel.ack(msg);
          }
        }
      } catch (error) {
        console.error(`Error while updating post likes details: ${error}`);
        return channel.ack(msg);
      }
    }
    process.on('exit', (code) => {
      channel.close();
      console.log(`Closing ${channel} channel`);
   });
    // return null;
  }
);

module.exports = PostsLikesConsumer;
