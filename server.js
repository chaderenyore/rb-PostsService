const mongoose = require("mongoose");
const app = require("./src");
const KEYS = require("./src/_config/keys");
const logger  = require('./logger.conf');
const CommentsLikesConsumer = require("./src/_queue/consumers/commentLikes.consumer");
const CommmnetRepliesConsumer = require("./src/_queue/consumers/commentReplies.consumer");
const PostsComentsConsumer = require("./src/_queue/consumers/postComments.consumer");
const PostDetailsConsumer = require("./src/_queue/consumers/postDetails.consumer");
const PostsLikesConsumer = require("./src/_queue/consumers/postLikes.consumer");


CommentsLikesConsumer.consume("Update Comment Likes");
CommmnetRepliesConsumer.consume("Update Comment Replies");
PostsComentsConsumer.consume("Update Post Comments");
PostDetailsConsumer.consume("Update Posts Details");
PostsLikesConsumer.consume("Update Posts Likes");


mongoose.set('strictQuery', true);
mongoose
  .connect(KEYS.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    logger.info(`Posts Service Database Connected......`)
    const PORT = process.env.PORT || 2102
    const server = app.listen(PORT, () => {
      
      logger.info(`Posts Service Server has started!... and running on port ${PORT}`);
      
    });
  }).catch(error => console.log(error));