const mongoose = require("mongoose");
const User = require("../Models/Users");
const Profile = require("../Models/Profile");
const jwt = require("jsonwebtoken");

const otpgenerator = require("otp-generator");
const OTP = require("../Models/otp");
const bcrypt = require("bcrypt");
const mailSender = require("../utils/mailsender");
const { validationResult } = require("express-validator");
require("dotenv").config();

// sendOtp
exports.sendOtp = async (req, res) => {
   try {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({
         success: false,
         message: "Validation errors",
         errors: errors.array(),
       });
     }

     const { email } = req.body;

     // Check if user already exists
     const existEmail = await User.findOne({ email });
     if (existEmail) {
       return res.status(400).json({
         success: false,
         message: "User already exists, please try again later",
       });
     }

    // Generate OTP
    let otp = otpgenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: true, specialChars: false });
    let result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpgenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: true, specialChars: false });
      result = await OTP.findOne({ otp: otp });
    }

    // Store OTP in DB
    const payload = { email, otp };
    const otpBody = await OTP.create(payload);

    // Send OTP via email
    try {
      await mailSender(
        email,
        "OTP for Email Verification",
        `Your OTP for email verification is: ${otp}. Please use this to complete your registration.`
      );
    } catch (error) {
      console.error("Error sending OTP email:", error);
      return res.status(500).json({
        success: false,
        message: "Error sending OTP email",
      });
    }

    // Return response successfully
    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// SignUp
exports.signUp = async (req, res) => {
   try {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({
         success: false,
         message: "Validation errors",
         errors: errors.array(),
       });
     }

     const { firstname, lastname, password, email, accountType, contact, otp, confirmPassword } = req.body;

    // Password match check
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match, try again later!",
      });
    }

    // Check if user already exists
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({
        success: false,
        message: "User already exists, please try again later",
      });
    }

    // Fetch most recent OTP
    const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (recentOtp.length === 0) {
      return res.status(400).json({
        success: false,
        message: "OTP not found, please request an OTP first",
      });
    } else if (otp !== recentOtp[0].otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create profile
    const profileDetails = await Profile.create({
      gender: null,
      DOB: null,
      about: null,
      contact: null,
    });

    // Create user
    const user = await User.create({
      firstname,
      lastname,
      password: hashPassword,
      email,
      accountType,
      additionalDetails: profileDetails._id,
      contact: Contact,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstname}${lastname}`,
    });

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Sign up successful",
      user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Check if user exists
    const user = await User.findOne({ email }).populate("additionalDetails");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Check password match
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      user.token = token;
      user.password = undefined; // Remove password before sending response

      const options = {
        httpOnly: true,
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        user,
        token,
        message: "Logged in successfully",
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Incorrect password",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Login failure, please try again later",
    });
  }
};

// Change Password
exports.changePassword = async (req, res) => {
  try {
    const { email, password, newPassword, confirmPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(403).json({
        success: false,
        message: "Incorrect current password",
      });
    }

    if (password === newPassword) {
      return res.status(400).json({
        success: false,
        message: "New password cannot be the same as the old password",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const update = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword }
    );

    if (update) {
      await mailSender(
        email,
        "Password Changed Successfully",
        "Your password has been changed successfully."
      );
      return res.status(200).json({
        success: true,
        message: "Password changed successfully",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while changing password, please try again later",
    });
  }
};
