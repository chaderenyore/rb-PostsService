const { Router } = require('express');
const validateRequest = require('../../../middlewares/vallidate');

const postSchema = require('../../validators/posts/posts.validator.js');

const router = Router();
router.post(
  '/',
  validateRequest(postSchema.postSchema, "body")
 
);

router.post(
  '/upgrade',
  validateRequest(postSchema.postSchema, "body")

);

module.exports = router;
