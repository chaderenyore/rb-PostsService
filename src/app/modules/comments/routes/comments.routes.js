const { Router } = require('express');
const validateRequest = require('../../../middlewares/vallidate');

const commentSchema = require('../../../modules/validators/comments/comments.validator.js');
const getCommentSchema = require('../../../modules/validators/comments/getComments.validator.js');
const editCommentSchema = require('../../../modules/validators/comments/editComment.validator.js');

const AddCommentController = require('../controllers/addComment.controller')
const EditCommentController = require('../controllers/editComment.controller.js')
const GetCommentController = require('../controllers/getComments.controller')

const router = Router();
router.get(
  '/:post_id',
  validateRequest(getCommentSchema.getCommentSchema, 'body'),
  GetCommentController.getComment
);

router.post(
  '/add-comment',
  validateRequest(commentSchema.commentSchema, 'body'),
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
