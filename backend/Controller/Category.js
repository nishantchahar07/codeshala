const Category = require("../Models/Category");

// Create Category Handler
exports.createCategory = async (req, res) => {
  try {
    // Fetch data
    const { name, description } = req.body;

    // Validation
    if (!name || !description) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Create entry in DB
    const categoryDetails = await Category.create({
      name: name,
      description: description,
    });

    console.log("Category Created:", categoryDetails);

    // Return response
    return res.status(200).json({
      success: true,
      message: "Category created successfully",
      data: categoryDetails, // sending created category data back
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating the category",
      error: err.message,
    });
  }
};

// Get All Categories
exports.showAllCategory = async (req, res) => {
  try {
    const allCategories = await Category.find({}, { name: true, description: true });

    return res.status(200).json({
      success: true,
      message: "All categories fetched successfully",
      data: allCategories, // better to return in `data`
    });
  } catch (err) {
    return res.status(500).json({
      success: false, // corrected here
      message: "Something went wrong while fetching all categories",
      error: err.message,
    });
  }
};
