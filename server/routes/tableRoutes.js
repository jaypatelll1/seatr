const express = require('express');
const router = express.Router();
const tablesController = require('../controllers/tableController');

// Get all tables for a specific restaurant
router.get('/restaurants/:id/tables', tablesController.getTables);

// Add a new table
router.post('/restaurants/:id/tables', tablesController.addTable);

// Update an existing table
router.put('/tables/:id', tablesController.updateTable);

// Delete a table
router.delete('/tables/:id', tablesController.deleteTable);

module.exports = router;
