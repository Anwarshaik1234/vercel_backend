import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user and check if token matches the one stored in DB
    const user = await User.findById(decoded._id);
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Critical: Check if the token matches the one in the database
    if (user.token !== token) {
      return res.status(401).json({ 
        message: 'Token is invalid or user logged in from another device',
        code: 'TOKEN_MISMATCH'
      });
    }

    // Attach user to request
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    res.status(500).json({ message: 'Server error during authentication' });
  }
};

export default auth;
