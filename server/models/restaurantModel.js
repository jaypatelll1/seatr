const {query} = require('../config/db'); // Assuming a PostgreSQL pool is configured

// Fetch all restaurants (with optional filters)
exports.getRestaurants = async (filters) => {
    console.log('filters',filters);
    
  const { location, cuisine, rating } = filters;
  let queryText = 'SELECT * FROM Restaurants WHERE 1=1';
  const params = [];

  if (location) {
    queryText += ' AND location ILIKE $' + (params.length + 1);
    params.push(`%${location}%`);
  }
  if (cuisine) {
    queryText += ' AND cuisine ILIKE $' + (params.length + 1);
    params.push(`%${cuisine}%`);
    
    
  }
  if (rating) {
    queryText += ' AND rating >= $' + (params.length + 1);
    params.push(rating);

  }

  console.log('queryText',queryText);

  const result = await query(queryText, params);
  return result.rows;
};

// Fetch a single restaurant by ID
exports.getRestaurantById = async (id) => {
  const result = await query('SELECT * FROM Restaurants WHERE restaurant_id = $1', [id]);
  return result.rows[0];
};

// Add a new restaurant
exports.addRestaurant = async (data) => {
  const { owner_id, name, location, description, cuisine, latitude, longitude, opening_time, closing_time} = data;
  console.log('owner_id, name, location, description, cuisine, latitude, longitude, opening_time, closing_time',owner_id, name, location, description, cuisine, latitude, longitude, opening_time, closing_time);
  
  // Perform the INSERT query to add a new restaurant
  const result = await query(
    `INSERT INTO Restaurants (owner_id, name, location, description, cuisine, latitude, longitude, opening_time, closing_time)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
    [owner_id, name, location, description, cuisine, latitude, longitude, opening_time, closing_time]
  );

  // Return the newly added restaurant data
  return result.rows[0]
};

// // Update restaurant details
// Function to update restaurant details in the database
exports.updateRestaurant = async (id, updatedFields) => {
  try {
    // Get the field names and values from updatedFields
    const fieldKeys = Object.keys(updatedFields);
    if (fieldKeys.length === 0) return null; // If no fields to update, return null

    // Create the SET clauses for the SQL query dynamically
    const setClauses = fieldKeys.map((key, index) => `${key} = $${index + 1}`);
    const values = Object.values(updatedFields);

    // SQL query to update restaurant details based on provided fields
    const queryText = `
      UPDATE Restaurants
      SET ${setClauses.join(', ')}
      WHERE restaurant_id = $${fieldKeys.length + 1}
      RETURNING *;`;

    // Append the restaurant_id (ID of the restaurant to update) to the values
    values.push(id);

    // Execute the query
    const result = await query(queryText, values);

    // Return the updated restaurant record (first row)
    return result.rows[0];
  } catch (error) {
    throw new Error('Error updating restaurant: ' + error.message);
  }
};


exports.checkTableAvailability =async (restaurantId, tableIds, startTime, endTime) => {
  const result = await query(
    `SELECT t.table_id 
FROM Tables t
WHERE t.restaurant_id = $1 
AND t.table_id = ANY($2)
AND NOT EXISTS (
  SELECT 1 FROM Bookings b
  WHERE b.restaurant_id = $1
  AND b.table_id = t.table_id
  AND (
    (b.start_time < $4 AND b.end_time > $3)
    OR (b.start_time >= $3 AND b.start_time < $4)
  )
  AND b.status NOT IN (12, 13)
);`,
    [restaurantId, tableIds, startTime, endTime]
  );
  return result.rows;
}


// Delete a restaurant
exports.deleteRestaurant = async (id) => {
  await query('DELETE FROM Restaurants WHERE restaurant_id = $1', [id]);
};

exports.getAvailability = async (id) => {
  try {
    
  } catch (error) {
    throw new Error('Error fetching availability: ' + error.message);
  }
};