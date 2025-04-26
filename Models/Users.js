const mongoose = require('mongoose');

const Users = new  mongoose.Schema({
 
    firstname : {
        required : true,
        type : String,
        trim : true
    },
    lastname : {
        required : true,
        type : String,
        trim : true
    },
    password : {
        required : true,
        type : String,
        trim : true
    },
    email : {
        required : true,
        type : String,
        trim : true
    },
    acountType : {
        required : true,
        type : String,
        enum : ["Admin" , "Student" , "Instructor"]
    },
    additionalDetails : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Profile",
        required : true
    },
    Courses: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Courses",
        required : true
    },
    additionalDetails : {
        type : String,
        
        required : true
    },
    courseProgress : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "CourseProgress"
    }

})


module.exports = mongoose.model("Users" , Users )