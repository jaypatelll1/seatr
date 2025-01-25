const express = require('express');
const reviewController = require('../controllers/reviews.controller');

const router = express.Router();

router.post('/create-review', reviewController.createReview);




module.exports = router;