const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/auth.controller.js');

const registrationRules = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('username').notEmpty().withMessage('Username is required'),
];

router.post('/register', registrationRules,authController.registerUser);
router.get('/practice-token', authController.practiceTokenGeneration);
router.post('/login', authController.loginUser);

module.exports = router;