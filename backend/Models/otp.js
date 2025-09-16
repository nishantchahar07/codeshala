const mongoose = require("mongoose");
const mailSender = require("../utils/mailsender");


const otp = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },

  otp: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60
  }

});

async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(email, "Verification Email from Codeshala ", otp);
    console.log("Email sent successfully", mailResponse);
  }
  catch (err) {
    console.log("error occured while sending otp", error);
    throw err;
  }
}

otp.pre("save", async function (next) {
  await sendVerificationEmail(this.email, this.otp);
  next();
})


module.exports = mongoose.model("otp", otp)