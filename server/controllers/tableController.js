const tablesModel = require('../models/tableModel');

// Get all tables for a specific restaurant
const getTables = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const tables = await tablesModel.getTablesByRestaurant(restaurantId);

    res.status(200).json({ tables });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch tables.' });
  }
};

// Add a new table
const addTable = async (req, res) => {
  try {
    const { unique_table_no, seats, joinable, joinable_to, status_occupied } = req.body;
    const restaurantId = req.params.id;

    if (!unique_table_no || !Number.isInteger(unique_table_no)) {
      return res.status(400).json({ message: 'unique_table_no is required and must be an integer.' });
    }

    const newTable = await tablesModel.addTable(
      restaurantId,
      unique_table_no,
      seats,
      joinable,
      joinable_to,
      status_occupied
    );

    res.status(201).json({ message: 'Table added successfully.', table: newTable });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add table.' });
  }
};

const updateTable = async (req, res) => {
  try {
    const { seats, joinable, joinable_to, status_occupied } = req.body;
    const tableId = req.params.id;

    // If joinable_to is not provided, default to an empty array
    const validatedJoinableTo = Array.isArray(joinable_to) ? joinable_to : [];

    const updatedTable = await tablesModel.updateTable(tableId, {
      seats,
      joinable,
      joinableTo: validatedJoinableTo, // Pass an array
      statusOccupied: status_occupied,
    });

    if (!updatedTable) {
      return res.status(404).json({ message: 'Table not found.' });
    }

    res.status(200).json({ message: 'Table updated successfully.', table: updatedTable });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update table.' });
  }
};


// Delete a table
const deleteTable = async (req, res) => {
  try {
    const tableId = req.params.id;

    const deletedTable = await tablesModel.deleteTable(tableId);

    res.status(200).json({ message: 'Table deleted successfully.', table: deletedTable });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete table.' });
  }
};

module.exports = {
  getTables,
  addTable,
  updateTable,
  deleteTable,
};
