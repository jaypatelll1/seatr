// Role-based authorization middleware
const authorizeRoles = (req, res, next) => {
    if (req.user.role !== 1) {
        // console.log('res',req.user.role);
        
      return res
        .status(403)
        .json({ message: 'Access denied. Insufficient permissions.' });
    }
    next();
  };
  
  module.exports = { authorizeRoles };