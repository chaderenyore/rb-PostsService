const CommentsLikesConsumer = require("./commentLikes.consumer");
const CommmnetRepliesConsumer = require("./commentReplies.consumer");
const PostsComentsConsumer = require("./postComments.consumer");
const PostDetailsConsumer = require("./postDetails.consumer");
const PostsLikesConsumer = require("./postLikes.consumer");

(exports.init_consumers = async ()=> {
await CommentsLikesConsumer.consume("Update Comment Likes");
await CommmnetRepliesConsumer.consume("Update Comment Replies");
await PostsComentsConsumer.consume("Update Post Comments");
await PostDetailsConsumer.consume("Update Posts Details");
await PostsLikesConsumer.consume("Update Posts Likes");
})()