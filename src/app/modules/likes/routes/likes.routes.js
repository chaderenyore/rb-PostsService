const { Router } = require('express');
const validateRequest = require('../../../middlewares/vallidate');

const LikesSchema = require('../../validators/likes/likes.validator.js');

const router = Router();
router.post(
  '/',
  validateRequest(LikesSchema.likesSchema, "body")
 
);

router.post(
  '/update',
  validateRequest(LikesSchema.likesSchema, "body")

);

module.exports = router;
