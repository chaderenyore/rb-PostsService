const { Router } = require('express');
const validateRequest = require('../../../middlewares/vallidate');

const commentSchema = require('../../../modules/validators/comments/comments.validator.js');
const getCommentSchema = require('../../../modules/validators/comments/getComments.validator.js');

const AddCommentController = require('../controllers/addComment.controller');

const router = Router();
router.get(
  '/:post_id',
  validateRequest(getCommentSchema.getCommentSchema, 'body')
);

router.post(
  '/add-comment',
  validateRequest(commentSchema.commentSchema, 'body'),
  AddCommentController.createComment
);

router.post('/delete', validateRequest(commentSchema.commentSchema, 'body'));

module.exports = router;
