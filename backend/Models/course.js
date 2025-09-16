const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName : {
        type : String,
    },
    courseDescription :{
        type : String,
        required : true,
        trim : true
    },
    instructor :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Users",
        required : true
  
    },

    whatWillYouLearn : {
        type : String,
        require : true 
    },
    CourseContent : [
        {type : mongoose.Schema.Types.ObjectId,
        ref : "section"
        }

    ],
    RatingandReviews :  {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'ratingAndReviews',
        required : true
    },
    price : { 
        type : Number,


    },
    thumbNail : { 
        type : String,
        trim  : true

    },
    Tag : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Tag"
    } , 
    StudentEnrolled : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Users",
            required : true
        }
    ]
        
    
});

module.exports = mongoose.model("Course" , courseSchema)