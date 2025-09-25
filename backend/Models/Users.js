const mongoose = require('mongoose');

const Users = new mongoose.Schema({
    firstname: {
        required: true,
        type: String,
        trim: true
    },
    lastname: {
        required: true,
        type: String,
        trim: true
    },
    password: {
        required: true,
        type: String,
        trim: true
    },
    email: {
        required: true,
        type: String,
        trim: true,
        unique: true
    },
    accountType: {
        required: true,
        type: String,
        enum: ["Admin", "Student", "Instructor"]
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
        required: true
    },
    courses: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Course",
        default: []
    },
    courseProgress: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "CourseProgress",
        default: []
    },
    contact: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    token: {
        type: String
    }

})


module.exports = mongoose.model("Users" , Users )