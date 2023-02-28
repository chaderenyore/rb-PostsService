const { Router } = require("express");
// const Posts = require('./modules/posts/routes/posts.routes');
const Comments = require("./modules/comments/routes/comments.routes");
// const Likes = require("./modules/likes/routes/likes.routes");
// const Suggested = require("./modules/suggested/routes/suggested.routes");



module.exports = () => {
  
  const router = Router();
  
  // router.use("/posts", Posts);
  router.use("/comments",  Comments);
  // router.use("/likes",  Likes);
  // router.use("/suggested",  Suggested);

  return router;
};
