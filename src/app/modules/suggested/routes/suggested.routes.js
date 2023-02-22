const { Router } = require('express');
const validateRequest = require('../../../middlewares/vallidate');

const SuggestedSchema = require('../../validators/suggested/suggested.validator.js');

const router = Router();
router.post(
  '/',
  validateRequest(SuggestedSchema.suggestedSchmea, "body")
 
);

router.post(
  '/update',
  validateRequest(SuggestedSchema.suggestedSchmea, "body")

);

module.exports = router;
