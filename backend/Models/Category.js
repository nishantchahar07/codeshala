const mongoose = require("mongoose")

const Tag= new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    description : {
        type : String,
        trim : true,
    },
        
    Course : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Course"
    }
})
module.exports = mongoose.model("Tag" , Tag)