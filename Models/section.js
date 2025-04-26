const mongoose = require("mongoose");



const section = new  mongoose.Schema({
  sectionName : {
    type : String,
  },
  SubSection : [
    {
        type : mongoose.Schema.Types.ObjectId,
        required : true ,
        ref : "subSection"
        
    }
  ]

       
        

    
})

module.exports = mongoose.model("section" , section)