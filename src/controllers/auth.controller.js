const User = require('../models/user.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const registerUser = async (req, res, next) => {
  // 1. Check for validation errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  try {
    const { username, email, password } = req.body;

    // 2. Check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({
        success: false,
        error: {
          message: 'A user with this email already exists.'
        }
      });
    }

    // 3. Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 4. Create user
    user = await User.create({
      username,
      email,
      password: hashedPassword
    });

    // 5. Send success response
    res.status(201).json({
      success: true,
      data: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    // 1. Get credentials
    const { email, password } = req.body;

    // 2. Basic validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: { message: 'Please provide both email and password.' }
      });
    }

    // 3. Find user
    const user = await User.findOne({ email });

    // 4. Check user + password
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        error: { message: 'Invalid credentials' }
      });
    }

    // 5. Create JWT payload
    const payload = {
      id: user._id,
      username: user.username
    };

 const token = jwt.sign(
  { id: user._id, username: user.username },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);
    // 7. Send response
    res.status(200).json({
      success: true,
      data: {
        token
      }
    });

  } catch (error) {
    next(error);
  }
};
// ==========================================
// Temporary function for JWT practice
// ==========================================

const practiceTokenGeneration = (req, res) => {

  // Mock user
  const mockUser = {
    _id: '654a5b8f1c3d4e5f6a7b8c9d',
    username: 'testuser',
    role: 'user'
  };

  // Payload
  const payload = {
    id: mockUser._id,
    username: mockUser.username
  };

  // Secret key
  const secretKey = process.env.JWT_SECRET;

  // Token options
  const options = {
    expiresIn: '1h'
  };

  // Generate token
  const token = jwt.sign(payload, secretKey, options);

  // Send response
  res.status(200).json({
    message: 'Token generated for practice!',
    token: token
  });
};

module.exports = {
  registerUser,
  practiceTokenGeneration
};