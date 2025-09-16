const Section = require("../Models/section");
const Course = require("../Models/course");

// Fetch Data (Create Section)
exports.createSection = async (req, res) => {
  try {
    const { sectionName, courseId } = req.body;

    // Validation
    if (!sectionName || !courseId) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Create section
    const sectionDetail = await Section.create({ sectionName: sectionName });

    // Push section into course
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: sectionDetail._id,
        },
      },
      { new: true }
    ).populate({
      path: "courseContent",
      populate: {
        path: "subSection", // populate subSection inside courseContent
      },
    });

    // Return response
    res.status(200).json({
      success: true,
      message: "New section created successfully",
      data: updatedCourseDetails,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating section. Please try again later.",
      error: err.message,
    });
  }
};

// Upload/Update Section
exports.updateSection = async (req, res) => {
  try {
    const { sectionName, sectionId } = req.body;

    if (!sectionName || !sectionId) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Update section
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName: sectionName },
      { new: true }
    );

    // If section not found
    if (!updatedSection) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    // Send response
    res.status(200).json({
      success: true,
      message: "Section updated successfully",
      data: updatedSection,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating section. Please try again later.",
      error: err.message,
    });
  }
};

// Delete Section
exports.deleteSection = async (req, res) => {
  try {
    const { sectionId } = req.body;

    if (!sectionId) {
      return res.status(403).json({
        success: false,
        message: "Section ID is required",
      });
    }

    // Delete section
    const deletedSection = await Section.findByIdAndDelete(sectionId);

    // If section not found
    if (!deletedSection) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    // Send response
    res.status(200).json({
      success: true,
      message: "Section deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while deleting section. Please try again later.",
      error: err.message,
    });
  }
};
