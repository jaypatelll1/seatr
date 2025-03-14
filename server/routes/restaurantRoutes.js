const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const { authorizeRoles } = require('../middleware/roleMiddleware'); // Example middleware for admin check
const {jwtAuthMiddleware}= require('../middleware/jwtAuthMiddleware')

// GET /restaurants
router.get('/',restaurantController.getRestaurants);

// GET /restaurants/:id
router.get('/:id', restaurantController.getRestaurantById);

// POST /restaurants (Admin Only)
router.post('/',  restaurantController.addRestaurant);

// PUT /restaurants/:id (Admin Only)
router.put('/:id',  restaurantController.updateRestaurant);

// DELETE /restaurants/:id (Admin Only)
router.delete('/:id', restaurantController.deleteRestaurant);

module.exports = router;
