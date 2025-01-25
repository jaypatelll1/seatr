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

  async generatePasswordResetToken(email) {
    const resetToken = Math.random().toString(36).substring(2, 8);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const result = await db.query(
      `UPDATE Users 
       SET reset_token = $1, reset_token_expires = $2 
       WHERE email = $3 
       RETURNING user_id, email`,
      [resetToken, expiresAt, email]
    );

    return result.rows[0] ? resetToken : null;
  },

  // Verify reset token
  async verifyResetToken(email, token) {
    const result = await db.query(
      `SELECT * FROM Users 
       WHERE email = $1 
       AND reset_token = $2 
       AND reset_token_expires > NOW()`,
      [email, token]
    );

    return result.rows[0];
  },

  // Update password and clear reset token
  async updatePassword(email, newPasswordHash) {
    const result = await db.query(
      `UPDATE Users 
       SET password_hash = $1, 
           reset_token = NULL, 
           reset_token_expires = NULL 
       WHERE email = $2 
       RETURNING user_id`,
      [newPasswordHash, email]
    );

    return result.rows[0];
  }
};

module.exports = userModel;
