const { Router } = require("express");
const { authorizeAdmin } = require("../../../middlewares/authorizeAdmin");
const validateRequest = require("../../../middlewares/vallidate");

// validators
const PostValidator = require("../../validators/admin/getAllPost.validator");
const DeletePostValidator = require("../../validators/admin/deletePosts.validator");
const ClearBinValidator = require("../../validators/admin/clearBin.validator");

// controllers
const AllPostController = require("../controllers/getAllPosts");
const ALlBannedPostsController = require("../controllers/getAllBannedPosts");
const AllBlockedPostController = require("../controllers/getAllBlockedPosts");
const AllReportedPostsController = require("../controllers/getAllReportedPosts");
const AllBinController = require("../controllers/getAllRecycleBin");
const DeletePostsController = require("../controllers/deletePosts");
const ClearBinController = require("../controllers/clearRecycleBin");

const router = Router();

router.get(
  "/",
  authorizeAdmin(["super", "admin", "moderator"]),
  validateRequest(PostValidator.getAllPostsQuerySchema, "query"),
  AllPostController.getAllPosts
);

router.get(
  "/banned-posts",
  authorizeAdmin(["super", "admin", "moderator"]),
  validateRequest(PostValidator.getAllPostsQuerySchema, "query"),
  ALlBannedPostsController.getAllBannedPosts
);

router.get(
  "/blocked-posts",
  authorizeAdmin(["super", "admin", "moderator"]),
  validateRequest(PostValidator.getAllPostsQuerySchema, "query"),
  AllBlockedPostController.getAllBlockedPosts
);

router.get(
  "/reported-posts",
  authorizeAdmin(["super", "admin", "moderator"]),
  validateRequest(PostValidator.getAllPostsQuerySchema, "query"),
  AllReportedPostsController.getAllReportedPosts
);

router.get(
  "/bin-posts",
  authorizeAdmin(["super", "admin"]),
  validateRequest(PostValidator.getAllPostsQuerySchema, "query"),
  AllBinController.getAllBinPosts
);

router.delete(
  "/bulk-delete",
  authorizeAdmin(["super", "admin", "moderator"]),
  validateRequest(DeletePostValidator.deletePostsSchema, "body"),
  DeletePostsController.bulkDeletePosts
);

router.delete(
  "/clear-bin",
  authorizeAdmin([
    "super",
    "admin",
    "moderator",
  ]),
  validateRequest(ClearBinValidator.clearBinSchema, "query"),
  ClearBinController.clearBinPosts
);

module.exports = router;
