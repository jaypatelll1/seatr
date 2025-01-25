const express = require('express');
const reviewController = require('../controllers/reviews.controller');
const {jwtAuthMiddleware}= require('../middleware/jwtAuthMiddleware')

const router = express.Router();

router.post('/create-review', jwtAuthMiddleware, reviewController.createReview);




module.exports = router;