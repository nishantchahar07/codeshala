const mongoose = require("mongoose");


const ratingandReviews = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,

        ref: 'User'

    },
    rating: {
        type: Number,
        required: true,
        trim: true

    },
    reviews: {
        type: String,
        required: true

    }




})

module.exports = mongoose.model("ratingandReviews", ratingandReviews);