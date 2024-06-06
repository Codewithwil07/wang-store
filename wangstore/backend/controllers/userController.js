import User from '../models/userModel.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import bcrypt from 'bcryptjs';
import createToken from '../utils/createToken.js';

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);

  const hashPassword = await bcrypt.hash(password, salt);

  if (!username || !email || !password) {
    throw new Error(`Please fill all inputs`);
  }

  const userExists = await User.findOne({ email });
  if (userExists) res.status(400).send(`User already exists`);

  const newUser = new User({ username, email, password: hashPassword });
  try {
    await newUser.save();
    createToken(res, newUser._id);

    res.status(201).send({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status();
    throw new Error(`Invalid user data`);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (isPasswordValid) {
      createToken(res, existingUser._id);

      res.status(201).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      });
      return;
    }
  }
});

const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', 'yemayu', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'Logged out succesfully' });
});

export { createUser, loginUser, logoutCurrentUser };
