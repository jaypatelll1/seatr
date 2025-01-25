const express = require('express');
const { jwtAuthMiddleware } = require('../middleware/jwtAuthMiddleware');
const {registerUser,loginUser}= require('../controllers/userController')

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

// router.post("/logout",logout)


module.exports = router;
// jwtAuthMiddleware