const { Router } = require('express');
const { authorize } = require("../../../middlewares/authorizeUser");
const validateRequest = require("../../../middlewares/vallidate");

const CreateComment = require('../../../modules/validators/comments/addComment.validator');

const AddCommentController = require('../controllers/addComment.controller')

const router = Router();
router.post(
  '/add-comment',
  authorize(['user','org']),
  validateRequest(CreateComment.addCommentSchema, "body"),
  AddCommentController.createComment
);


module.exports = router;
