const pool = require('../config/db'); // Assuming you have a configured DB connection

const Review = {
  create: async (reviewData) => {
    const { user_id, restaurant_id, rating, comment } = reviewData;
    const query = `
      INSERT INTO reviews (user_id, restaurant_id, rating, comment)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [user_id, restaurant_id, rating, comment];
    const result = await pool.query(query, values);
    return result.rows[0];
  },
};

module.exports = Review;
