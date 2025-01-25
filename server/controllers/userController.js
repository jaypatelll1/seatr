require('dotenv').config();
const { hashPassword, verifyPassword } = require('../utils/hashUtil');
const { generateToken } = require('../utils/token');
const userModel = require('../models/userModel');

// Register User
const registerUser = async (req, res) => {
  const { name, email, password, role, phone } = req.body;

  if (!name || !email || !password || !role || !phone) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create the user in the database
    const user = await userModel.createUser(name, email, hashedPassword, role, phone);

    return res.status(201).json({
      message: 'User created successfully!',
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error registering user', details: error.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Find user by email
    const user = await userModel.findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify the password
    const isPasswordMatch = await verifyPassword(password, user.password_hash);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = await generateToken({
      id: user.user_id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
    console.log("token: ",token)

    // Set cookie with the token
    res.cookie('jwttoken', token, {
      expires: new Date(Date.now() + 86400000), // 1 day expiration
      httpOnly: true,
      sameSite: 'None',
      secure: true,
    });

    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};

module.exports = { registerUser, loginUser };
