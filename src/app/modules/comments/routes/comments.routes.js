const { Router } = require('express');
const validateRequest = require('../../../middlewares/vallidate');

const commentSchema = require('../../../modules/validators/comments/comments.validator.js');

const router = Router();
router.post(
  '/',
  validateRequest(commentSchema.commentSchema, "body")
 
);

router.post(
  '/delete',
  validateRequest(commentSchema.commentSchema, "body")

);

module.exports = router;
