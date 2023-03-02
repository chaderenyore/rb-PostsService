const { Router } = require('express');
const validateRequest = require('../../../middlewares/vallidate');

const commentSchema = require('../../../modules/validators/comments/comments.validator.js');
const editCommentSchema = require('../../../modules/validators/comments/editComment.validator.js');

const AddCommentController = require('../controllers/addComment.controller')
const EditCommentController = require('../controllers/editComment.controller.js')

const router = Router();
router.post(
  '/add-comment',
  validateRequest(commentSchema.commentSchema, "body"),
  AddCommentController.createComment
);

router.post(
  '/edit-comment',
  validateRequest(editCommentSchema.editCommentSchema, "body"),
  EditCommentController.editComment
);

router.post(
  '/delete',
  validateRequest(commentSchema.commentSchema, "body")

);

module.exports = router;
