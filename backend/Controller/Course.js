const Course = require("../Models/course");
const Category = require("../Models/Category");
const User = require("../Models/Users");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

exports.createCourse = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      whatWillYouLearn,
      category, // Changed to lowercase
    } = req.body;

    const thumbnail = req.files.thumbnailImage;

    // Validation
    if (
      !name ||
      !description ||
      !price ||
      !whatWillYouLearn ||
      !category ||
      !thumbnail
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check for Instructor
    const userId = req.user.id;
    const instructor = await User.findById(userId);
    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }

    // Category validation
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(400).json({
        success: false,
        message: "Category details not found",
      });
    }

    // Upload thumbnail to Cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    // Create new course
    const newCourse = await Course.create({
      courseName: name,
      courseDescription: description,
      price: price,
      whatWillYouLearn: whatWillYouLearn,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      instructor: instructor._id,
    });

    // Add course to Instructor
    await User.findByIdAndUpdate(
      instructor._id,
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    // Add course to Category
    await Category.findByIdAndUpdate(
      categoryDetails._id,
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating the course",
      error: err.message,
    });
  }
};

// Show All Courses
exports.showAllCourse = async (req, res) => {
  try {
    const allCourses = await Course.find({});
    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data: allCourses,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Cannot show course data",
      error: err.message,
    });
  }
};
