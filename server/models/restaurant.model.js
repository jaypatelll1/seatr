// const db = require('../config/db');

// const restaurantModel = {
//   async getAllRestaurants(filters = {}) {
//     let query = 'SELECT * FROM Restaurants WHERE 1=1';
//     const params = [];
//     let paramCount = 1;

//     if (filters.cuisine) {
//       query += ` AND cuisine = $${paramCount}`;
//       params.push(filters.cuisine);
//       paramCount++;
//     }

//     if (filters.location) {
//       query += ` AND location ILIKE $${paramCount}`;
//       params.push(`%${filters.location}%`);
//       paramCount++;
//     }

//     const result = await db.query(query, params);
//     return result.rows;
//   },

//   async getRestaurantById(restaurantId) {
//     const result = await db.query(
//       `SELECT * FROM Restaurants WHERE restaurant_id = $1`,
//       [restaurantId]
//     );
//     return result.rows[0];
//   },

// module.exports = restaurantModel;