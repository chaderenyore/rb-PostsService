const { Router } = require("express");
const { authorize } = require("../../../middlewares/authorizeUser");
const validateRequest = require("../../../middlewares/vallidate");

// validators
const LikeAPostPost = require("../../validators/likes/posts/likePost.validator");
const UnlikeAPost = require("../../validators/likes/posts/unlikePost.validator");
const GetAPostLikes = require("../../validators/likes/posts/getAllPostsLikes.validator");
const LikeAComment = require("../../validators/likes/comments/likeComent.validator");
const UnlikeAComment = require("../../validators/likes/comments/unlikeCommnent.validator");
const GetACommentsLikes = require("../../validators/likes/comments/getAllCommentLikes.validator");

// controllers
const LikeAPostController = require("../controllers/posts/like.controller");
const UnlikeAPostController = require("../controllers/posts/unlike.controller");
const GetAllPostsLikesController = require("../controllers/posts/getAllLikes.controller");
const LikeACommentController = require("../controllers/comments/like.controller");
const GetAllCOmmentLikesController = require("../controllers/comments/getAllLikes.controller");
const UnlikeACommentController = require("../controllers/comments/unlike.controller");

const router = Router();

router.post(
  "/like-post",
  authorize(['user','org']),
  validateRequest(LikeAPostPost.likePostsQuerySchema, "query"),
  LikeAPostController.likeAPost
);

router.post(
  "/unlike-post",
  authorize(['user','org']),
  validateRequest(UnlikeAPost.UnlikeAPostsQuerySchema, "query"),
  UnlikeAPostController.unLikeAPost
);

router.get(
    "/post-likes/all",
    authorize(['user','org']),
    validateRequest(GetAPostLikes.getAllPOstsLikesQuerySchema, "query"),
    GetAllPostsLikesController.getAPostLikes
  );

router.post(
  "/like-comment",
  authorize(['user','org']),
  validateRequest(LikeAComment.likeACommentQuerySchema, "query"),
  LikeACommentController.likeAComment
);

router.post(
  "/unlike-comment",
  validateRequest(UnlikeAComment.UnlikeACommentQuerySchema, "query"),
  UnlikeACommentController.unLikeAComment
);

router.put(
    "/comments-likes/all",
    authorize(['user','org']),
    validateRequest( GetACommentsLikes.getCommentsLikesQuerySchema, "query"),
    GetAllCOmmentLikesController.getACommentLikes
  );


module.exports = router;
