const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

// Import controllers
const { sendOtp, signUp, login, changePassword } = require('../Controller/Auth');

// Import middleware
const { auth } = require('../middleware/auth');

// Routes

// Send OTP
router.post('/sendotp', [
    body('email').isEmail().withMessage('Please provide a valid email').normalizeEmail(),
], sendOtp);

// Signup
router.post('/signup', [
    body('firstname').isLength({ min: 1 }).withMessage('First name is required').trim().escape(),
    body('lastname').isLength({ min: 1 }).withMessage('Last name is required').trim().escape(),
    body('email').isEmail().withMessage('Please provide a valid email').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true;
    }),
    body('accountType').isIn(['Admin', 'Student', 'Instructor']).withMessage('Invalid account type'),
    body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits').isNumeric().withMessage('OTP must be numeric'),
], signUp);

// Login
router.post('/login', [
    body('email').isEmail().withMessage('Please provide a valid email').normalizeEmail(),
    body('password').isLength({ min: 1 }).withMessage('Password is required'),
], login);

// Change password (protected route)
router.post('/changepassword', auth, [
    body('email').isEmail().withMessage('Please provide a valid email').normalizeEmail(),
    body('password').isLength({ min: 1 }).withMessage('Current password is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.newPassword) {
            throw new Error('Password confirmation does not match new password');
        }
        return true;
    }),
], changePassword);

module.exports = router;