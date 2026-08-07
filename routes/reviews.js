const express = require('express');
const {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview
} = require('../controllers/reviews');

const validate = require('../middleware/validate');
const {
  reviewIdValidation,
  createReviewValidation,
  updateReviewValidation
} = require('../middleware/reviewValidator');
const { isAuthenticated } = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllReviews);
router.get('/:id', reviewIdValidation, validate, getReviewById);
router.post('/', isAuthenticated, createReviewValidation, validate, createReview);
router.put('/:id', isAuthenticated, updateReviewValidation, validate, updateReview);
router.delete('/:id', isAuthenticated, reviewIdValidation, validate, deleteReview);

module.exports = router;
