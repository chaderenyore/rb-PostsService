const { Router } = require('express');
const { authorize } = require("../../../middlewares/authorizeUser");
const validateRequest = require("../../../middlewares/vallidate");

const CreateComment = require('../../../modules/validators/comments/addComment.validator');
const getCommentSchema = require('../../../modules/validators/comments/getComments.validator.js');
const EditComment = require("../../validators/comments/editComment.validator");
const DeleteComment = require("../../validators/comments/deleteComment.validator");
const ReplyComment = require("../../validators/comments/reply.validator");
const AllPosComments = require("../../validators/comments/getAllPostsCommenst.validator");
const AllCommentReplies = require("../../validators/comments/getAllReplies.validator");

// controllers
const AddCommentController = require('../controllers/addComment.controller');
const EditCommentController = require('../controllers/editCommnet.controller');
const DeleteCommentController = require('../controllers/deleteComment.controller');
const ReplyCommentController = require('../controllers/replyAComment.controllers');
const AllCommentRepliesController = require('../controllers/getAllCommentsReplies.controller');
const AllPostCommentsController = require('../controllers/getAPostsComents.controller');
const GetCommentController = require('../controllers/getComments.controller')

const router = Router();

router.post(
  '/add-comment',
  authorize(['user','org']),
  validateRequest(CreateComment.addCommentSchema, 'body'),
  AddCommentController.createComment
);

router.post(
  '/edit',
  authorize(['user','org']),
  validateRequest(EditComment.editCommentSchema, "body"),
  EditCommentController.editComment
);
router.delete(
  '/',
  authorize(['user','org']),
  validateRequest(DeleteComment.deleteCommentSchema, "query"),
  DeleteCommentController.deleteComment
);

router.post(
  '/reply',
  authorize(['user','org']),
  validateRequest(ReplyComment.replyCommentSchema, "body"),
  ReplyCommentController.replyAComment
);

router.get(
  '/reply/all',
  validateRequest(AllCommentReplies.getAllRepliesQuerySchema, "query"),
  AllCommentRepliesController.getAllCommentReplies
);

router.get(
  '/post-comments/all',
  validateRequest(AllPosComments.getAllPostCommentQuerySchema, "query"),
  AllPostCommentsController.getAllPostComments
);


module.exports = router;
