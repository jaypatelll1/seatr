const Review = require('../models/reviews.model');

const createReview = async (req, res) => {
  const { user_id, restaurant_id, rating, comment } = req.body;

  // Validate required fields
  if (!user_id || !restaurant_id || !rating) {
    return res.status(400).json({ message: 'user_id, restaurant_id, and rating are required.' });
  }

  try {
    const review = await Review.create({ user_id, restaurant_id, rating, comment });

    res.status(201).json({
      message: 'Review created successfully.',
      review,
    });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({
      message: 'An error occurred while creating the review.',
    });
  }
};

module.exports = {
  createReview,
};
