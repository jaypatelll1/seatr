const restaurantModel = require('../models/restaurantModel');

// Fetch all restaurants
exports.getRestaurants = async (req, res) => {
    try {
      const filters = req.query;
      const restaurants = await restaurantModel.getRestaurants(filters);
      
      // Check if the response is an array (list of restaurants)
      if (Array.isArray(restaurants) && restaurants.length > 0) {
        // If multiple restaurants are returned, map the array and return it
        const response = restaurants.map((restaurant) => ({
          restaurant_id: restaurant.restaurant_id || null,
          owner_id: restaurant.owner_id || null,
          name: restaurant.name || "Unnamed Restaurant",
          location: restaurant.location || "Unknown Location",
          description: restaurant.description || null,
          contact_number: restaurant.contact_number || null,
          latitude: restaurant.latitude || null,
          longitude: restaurant.longitude || null,
          opening_time: restaurant.opening_time || "08:00:00",
          closing_time: restaurant.closing_time || "22:00:00",
          cuisine: restaurant.cuisine || "Not Specified"
        }));
  
        res.status(200).json(response);
      } else {
        // If no restaurants are found, return an empty array or appropriate message
        res.status(200).json([]);
      }
  
    } catch (error) {
      res.status(500).json({ message: 'Error fetching restaurants', error: error.message });
    }
  };
  

// Fetch a single restaurant by ID
exports.getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await restaurantModel.getRestaurantById(id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching restaurant', error: error.message });
  }
};

// Add a new restaurant (Admin Only)
exports.addRestaurant = async (req, res) => {
  try {
    const restaurantData = req.body;
    console.log('restaurantData',restaurantData);
    
    if (!restaurantData.name || !restaurantData.location || !restaurantData.cuisine || !restaurantData.opening_time || !restaurantData.closing_time || !restaurantData.owner_id) {
        return res.status(400).json({ message: "Missing required fields" });
      }
    const newRestaurant = await restaurantModel.addRestaurant(restaurantData);
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(500).json({ message: 'Error adding restaurant', error: error.message });
  }
};

// updateRestaurant.js

exports.updateRestaurant = async (req, res) => {
    const { id } = req.params; // Restaurant ID from the URL
    const updatedData = req.body; // Updated data from the request body
  
    try {
      // Initialize an object to store fields that need updating
      const updatedFields = {};
  
      // Only include fields that were provided in the request body
      if (updatedData.name) updatedFields.name = updatedData.name;
      if (updatedData.location) updatedFields.location = updatedData.location;
      if (updatedData.description) updatedFields.description = updatedData.description;
      if (updatedData.contact_number) updatedFields.contact_number = updatedData.contact_number;
      if (updatedData.latitude) updatedFields.latitude = updatedData.latitude;
      if (updatedData.longitude) updatedFields.longitude = updatedData.longitude;
      if (updatedData.opening_time) updatedFields.opening_time = updatedData.opening_time;
      if (updatedData.closing_time) updatedFields.closing_time = updatedData.closing_time;
      if (updatedData.cuisine) updatedFields.cuisine = updatedData.cuisine;
  
      // If no fields are provided to update, return a 400 error
      if (Object.keys(updatedFields).length === 0) {
        return res.status(400).json({ message: 'No fields provided to update' });
      }
  
      // Call the model to update the restaurant with the new data
      const updatedRestaurant = await restaurantModel.updateRestaurant(id, updatedFields);
  
      // If the restaurant is not found, return a 404 error
      if (!updatedRestaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
      }
  
      // Return the updated restaurant as the response
      res.status(200).json({
        message: 'Restaurant updated successfully',
        restaurant: updatedRestaurant,
      });
    } catch (error) {
      // Handle errors and return a 500 status with the error message
      res.status(500).json({ message: 'Error updating restaurant', error: error.message });
    }
  };
  

// Delete a restaurant (Admin Only)
exports.deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    await restaurantModel.deleteRestaurant(id);
    res.status(200).json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting restaurant', error: error.message });
  }
};
 