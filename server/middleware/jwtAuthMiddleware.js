const jwt = require('jsonwebtoken');
const {generateToken} = require("../utils/token");

require('dotenv').config();

// For HTTP requests
const jwtAuthMiddleware = (req, res, next) => {
  // const token = req.header("Authorization")?.split(" ")[1]; // Bearer token
  const token = req.cookies.jwttoken;
  // console.log('token',token);
  
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access Denied: No Token Provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid Token' });
    req.user = decoded; // Attach user details from the token to the request object
    next();
  });
};


const tokenMiddleware = async (req, res, next) => {
    const token = req.cookies.jwttoken;
    // console.log('token is ', token);
    
    const {id,email,name,role} = req.body
  
    const data = {
      "id" :id,
      "email" : email,
      "name" : name,
      "role" :role
    }
    // console.log('data is ', data );
    
  
    if (!token) {
      return res.status(401).json({ message: 'Access Denied: No Token Provided' });
    } else {
      try {
        const refreshToken = await generateToken(data); // Ensure `token` is compatible
        // console.log('refresh token is ',refreshToken );
        
        Object.keys(req.cookies).forEach((jwttoken) => {
          res.clearCookie(jwttoken, { path: '/' });
        });
        res.cookie('jwttoken', refreshToken, { httpOnly: true, secure: true });
        res.json({message : "token is processed" , refreshToken})
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error generating token' });
      }
    }
    // next();
   
  };

 

module.exports = { jwtAuthMiddleware , tokenMiddleware };
