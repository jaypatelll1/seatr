const {query} = require('../config/db');

// Function to get all tables for a specific restaurant
const getTablesByRestaurant = async (restaurantId) => {
  const queryText = `
    SELECT * FROM Tables
    WHERE restaurant_id = $1
    ORDER BY unique_table_no ASC;
  `;
  const result = await query(queryText, [restaurantId]);
  return result.rows;
};

// Function to add a new table
const addTable = async (restaurantId, uniqueTableNo, seats, joinable, joinableTo, statusOccupied) => {
    const tableIdentifier = `${restaurantId}-${uniqueTableNo}`;
  
    const queryText = `
      INSERT INTO Tables (restaurant_id, unique_table_no, capacity, is_available, joinable, joinable_to, table_identifier, status_occupied)
      VALUES ($1, $2, $3, TRUE, $4, $5::JSONB, $6, $7)
      RETURNING *;
    `;
    const result = await query(queryText, [
      restaurantId,
      uniqueTableNo,
      seats,
      joinable,
      JSON.stringify(joinableTo) || '{}', // Ensure valid JSON string
      tableIdentifier,
      statusOccupied || false,
    ]);
    return result.rows[0];
  };
  
  const updateTable = async (id, updatedFields) => {
    const { seats, joinable, joinableTo, statusOccupied } = updatedFields;
  
    const queryText = `
      UPDATE Tables
      SET
        capacity = COALESCE($1, capacity),
        joinable = COALESCE($2, joinable),
        joinable_to = COALESCE($3::JSONB, joinable_to), -- Explicit cast to JSONB
        status_occupied = COALESCE($4, status_occupied),
        updated_at = CURRENT_TIMESTAMP
      WHERE table_id = $5
      RETURNING *;
    `;
  
    const result = await query(queryText, [
      seats || null,
      joinable || null,
      joinableTo ? JSON.stringify(joinableTo) : '[]', // Ensure valid JSON array
      statusOccupied || null,
      id,
    ]);
  
    return result.rows[0];
  };
  
  

// Function to delete a table
const deleteTable = async (tableId) => {
  const queryText = `DELETE FROM Tables WHERE table_id = $1 RETURNING *;`;
  const result = await query(queryText, [tableId]);
  return result.rows[0];
};

module.exports = {
  getTablesByRestaurant,
  addTable,
  updateTable,
  deleteTable,
};
