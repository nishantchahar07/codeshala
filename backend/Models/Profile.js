const mongoose = require("mongoose");


const Profile = new  mongoose.Schema({
 
        gender : {
            type : String,
            Required : true,
            trim : true        
        },
        DOB: {
            type : String,
          
                   
        },
        About: {
            type : String,
           
            trim : true        
        },
        Contact: {
            type : Number,
            Required : true,
                 
        },
        
        

    
})

module.exports = mongoose.model("Profile" , Profile)