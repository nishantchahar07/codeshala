const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = () => {
    mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("DB Connected")
    })
    .catch((err) => 
    console.error(err))
}

module.exports = dbConnect;