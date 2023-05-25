const { Router } = require("express");
const { authorize } = require("../../../middlewares/authorizeUser");
const { authorizeAdmin } = require("../../../middlewares/authorizeAdmin");
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
const DeepSearchPosts = require("../../validators/posts/deepSearch.validator");
const FilterPostsByCoinMention = require("../../validators/posts/searchByCoinMention.validator");


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
const DeepSearchPostsController = require("../controllers/deepSearchPosts.controller");
const FilterPostsByCoinController = require("../controllers/searchCommunityByCoinMention.controller");


const uploadFile = require("../../../../_helpers/uploadFile");
const KEYS = require("../../../../_config/keys");

const router = Router();

router.post(
  "/",
  authorize(["user", "org"]),
  validateRequest(CreatePost.createPostsSchema, "body"),
  CreatePostController.createPost
);

router.get(
  "/",
  authorize(["user", "org"]),
  validateRequest(GetUserPosts.getUsersPostsQuerySchema, "query"),
  GetUserPostsController.getAUsersPosts
);

router.get(
  "/details/:post_id",
  authorize(["user", "org"]),
  validateRequest(GetPostDetails.getSinglePostSchema, "params"),
  GetPostDetailsController.getPostDtails
);

router.put(
  "/block",
  authorize(["user", "org"]),
  validateRequest(BlockPost.blockPostQuerySchema, "query"),
  BlockPostController.blockAPost
);

router.post(
  "/ban-post",
  authorizeAdmin([
    "super",
    "admin",
    "moderator",
  ]),
  validateRequest(BanPost.banPostsSchema, "body"),
  BanPostController.bannPosts
);

router.put(
  "/change-visibility",
  authorize(["user", "org"]),
  validateRequest(ChangePostVisibility.changePostVisibilitySchema, "query"),
  ChangePostVisibilityController.changeVisibility
);

router.delete(
  "/",
  authorize(["user", "org"]),
  validateRequest(DeletePost.deletePostSchema, "query"),
  DeletePostController.deletePost
);

router.post(
  "/edit-post",
  authorize(["user", "org"]),
  validateRequest(EditPost.updatePostsQuerySchema, "query"),
  validateRequest(EditPost.updatePostsBodySchema, "body"),
  EditPostController.updatePostInfo
);

router.post(
  "/filter",
  authorize(["user", "org"]),
  validateRequest(FilterPost.searchSchema, "query"),
  FilterPostController.filterPosts
);

router.get(
  "/community-posts",
  authorize(["user", "org"]),
  validateRequest(CommunityPosts.getCommunityPostsQuerySchema, "query"),
  CommunityPostsController.getAllCommunityPostPosts
);

router.post(
  "/report-post",
  authorize(["user", "org"]),
  validateRequest(ReportPost.reportPostsSchema, "body"),
  ReportPostController.reportAPost
);

router.post(
  "/re-post",
  authorize(["user", "org"]),
  validateRequest(RepostPost.repostBodySchema, "body"),
  RepostPostController.repost
);

router.get(
  "/sort",
  authorize(["user", "org"]),
  validateRequest(SortPost.sortPostsByDateSchema, "query"),
  SortPostController.sortPosts
);

router.post(
  "/tweet-post",
  authorize(["user", "org"]),
  validateRequest(TweetPost.tweetPostSchema, "body"),
  TweetPostController.tweetAPost
);

router.post(
  "/post-media",
  authorize(["user", "org"]),
  validateRequest(UploadPostMedia.uploadPostMediaQuerySchema, "query"),
  validateRequest(UploadPostMedia.uploadPostMediaBodySchema, "body"),
  uploadFile("posts").array("post_media"),
  UploadPostMediaController.updatePostMedia
);

router.post(
  "/search",
  authorize(["user", "org"]),
  validateRequest(DeepSearchPosts.deepSearchSchema, "query"),
  DeepSearchPostsController.deepSearchPost
);

router.get(
  "/filterbycoin",
  authorize(["user", "org"]),
  validateRequest(FilterPostsByCoinMention.searchByCoinMentionQuerySchema, "query"),
  FilterPostsByCoinController.searchPostsByCoinMention
);

module.exports = router;
