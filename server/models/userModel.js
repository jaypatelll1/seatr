const db = require('../config/db'); // PostgreSQL client instance

const userModel = {
  // Create a new user
  async createUser(name, email, passwordHash, role, phone) {
    const result = await db.query(
      `INSERT INTO Users (name, email, password_hash, role, phone) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING user_id, name, email, role, phone`,
      [name, email, passwordHash, role, phone]
    );
    return result.rows[0];
  },

  // Find user by email
  async findUserByEmail(email) {
    const result = await db.query('SELECT * FROM Users WHERE email = $1', [email]);
    return result.rows[0];
  },
};

module.exports = userModel;
