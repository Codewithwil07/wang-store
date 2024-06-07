import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from './asyncHandler.js';

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  //   membaca jwt dari jwt cookie
  token = req.cookies.jwt;
  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select('-password');
    next();
    try {
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token infailed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, ga ada!🤔');
  }
});

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send('Not authorized as an Admin');
  }
};

const getAllUsers = asyncHandler(async (req, res) => {
  const user = await User.find({});
  res.json(user);
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error(`User not found`);
  }
});

export { authenticate, authorizeAdmin, getAllUsers, getCurrentUserProfile };
