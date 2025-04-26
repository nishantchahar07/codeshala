const mongoose = require("mongoose");


const Courseprogress = new  mongoose.Schema({
courseID : {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Courses"
},
CompletedVideos : [
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : "subSection"
    }
]
       
        

    
})

module.exports = mongoose.model("courseProgress" , Courseprogress)