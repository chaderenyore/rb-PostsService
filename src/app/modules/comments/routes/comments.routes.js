const { Router } = require('express');
const validateRequest = require('../../../middlewares/vallidate');

const commentSchema = require('../../../modules/validators/comments/comments.validator.js');

const AddCommentController = require('../controllers/addComment.controller')

const router = Router();
router.post(
  '/add-comment',
  validateRequest(commentSchema.commentSchema, "body"),
  AddCommentController.createComment
);

router.post(
  '/delete',
  validateRequest(commentSchema.commentSchema, "body")

);

module.exports = router;
