const { Router } = require("express");
const { authorize } = require("../../../middlewares/authorizeUser");
const validateRequest = require("../../../middlewares/vallidate");

// validators
const CreatePost = require("../../validators/posts/createAPost.validator");
const GetUserPosts = require("../../validators/posts/getUsersPost.validator");
const BlockPost = require("../../validators/posts/blockPost.validator");
const BanPost = require("../../validators/posts/banPost.validator");
const ChangePostVisibility = require("../../validators/posts/changePostsVisisbility.validator");
const DeletePost = require("../../validators/posts/removePost.validator");
const EditPost = require("../../validators/posts/updatePosts.validator");
const FilterPost = require("../../validators/posts/filter.validator");
const CommunityPosts = require("../../validators/posts/communityPosts.validator");
const ReportPost = require("../../validators/posts/reportPost.validator");
const RepostPost = require("../../validators/posts/repost..validator");
const SortPost = require("../../validators/posts/sortPosts.validator");
const TweetPost = require("../../validators/posts/tweetPost.validator");
const UploadPostMedia = require("../../validators/posts/uploadPostMedia.validators");
const GetPostDetails = require("../../validators/posts/getAPostDetails.validator");
// controllers
const CreatePostController = require("../controllers/createAPosts.controller");
const GetUserPostsController = require("../controllers/getUsersPosts.controller");
const BlockPostController = require("../controllers/blockPost.controller");
const BanPostController = require("../controllers/bannedPosts.controllers");
const ChangePostVisibilityController = require("../controllers/changePostVisibiltiy.controller");
const DeletePostController = require("../controllers/deletedAPost.controller");
const EditPostController = require("../controllers/editPost.controller");
const FilterPostController = require("../controllers/filter.controller");
const CommunityPostsController = require("../controllers/getAllCommunityPosts.controller");
const ReportPostController = require("../controllers/reportPost.controller");
const RepostPostController = require("../controllers/repost.controller");
const SortPostController = require("../controllers/sortPosts.controller");
const TweetPostController = require("../controllers/tweet.controller");
const UploadPostMediaController = require("../controllers/uploadPostMedia.controller");
const GetPostDetailsController = require("../controllers/getPostDetails.controller");

const uploadFile = require("../../../../_helpers/uploadFile");
const KEYS = require("../../../../_config/keys");

const router = Router();
router.post(
  "/",
  validateRequest(CreatePost.createPostsSchema, "body"),
  CreatePostController.createPost
);

router.get(
  "/",
  validateRequest(GetUserPosts.getUsersPostsQuerySchema, "query"),
  authorize(['user','org']),
  GetUserPostsController.getAUsersPosts
);
router.get(
    "/:post_id",
    validateRequest(GetPostDetails.getSinglePostSchema, "body"),
    authorize(['user','org']),
    GetPostDetailsController.getPostDtails
  );
router.put(
  "/",
  authorize(['user','org']),
  validateRequest(BlockPost.blockPostQuerySchema, "query"),
BlockPostController.blockAPost
);

router.post(
  "/ban-post",
  validateRequest(BanPost.banPostsSchema, "body"),
  BanPostController.bannPosts
);

router.put(
    "/change-visibility",
    authorize(['user','org']),
    validateRequest(ChangePostVisibility.changePostVisibilitySchema, "query"),
    ChangePostVisibilityController.changeVisibility
  );

  router.delete(
    "/",
    authorize(['user','org']),
    validateRequest(DeletePost.deletePostSchema, "query"),
    DeletePostController.deletePost
  );

  router.post(
    "/edit-post",
    validateRequest(EditPost.updatePostsSchema, "query"),
    authorize(['user','org']),
    EditPostController.updatePostInfo
  );

  router.post(
    "/filter",
    validateRequest(FilterPost.searchSchema, "query"),
    authorize(['user','org']),
    FilterPostController.filterPosts
  );

  router.get(
    "/community-posts",
    validateRequest(CommunityPosts.getCommunityPostsQuerySchema, "query"),
    authorize(['user','org']),
    CommunityPostsController.getAllCommunityPostPosts
  );

  router.post(
    "/report-post",
    validateRequest(ReportPost.reportPostsSchema, "body"),
    authorize(['user','org']),
    ReportPostController.reportAPost
  );

  router.post(
    "/re-post",
    validateRequest(RepostPost.repostBodySchema, "body"),
    authorize(['user','org']),
    RepostPostController.repost
  );

  router.post(
    "/sort",
    validateRequest(SortPost.sortPostsByDateSchema, "query"),
    authorize(['user','org']),
    SortPostController.sortPosts
  );

  router.post(
    "/tweet-post",
    validateRequest(TweetPost.tweetPostSchema, "body"),
    authorize(['user','org']),
    TweetPostController.tweetAPost
  );

  router.post(
    "/post-media",
    authorize(['user','org']),
    validateRequest(UploadPostMedia.uploadPostMediaBodySchema, "body"),
    validateRequest(UploadPostMedia.uploadPostMediaQuerySchema, "query"),
    uploadFile("posts").single("post_media"),
    UploadPostMediaController.updatePostMedia
  );

module.exports = router;
