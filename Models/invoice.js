const mongoose = require("mongoose");


const Invoice = new mongoose.Schema({

   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
   },
   courseName: {
      type: String,
      required: true,


   },
   price: {
      type: String,

   },
   address: {
      type: String,
      required: true,
      maxLength: 50,
      trim: true
   },
   pinCode: {
      type: String,
      required: true,
      trim: true


   },
   courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
   }



})

module.exports = mongoose.model("Invoice", Invoice)