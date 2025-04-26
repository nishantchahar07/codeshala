// isme hm nodemailer ki configurations ko likha or jyda
// kuch nhi hai

const nodemailer = require("nodemailer");
require("dotenv").config();
const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: 'gmail',
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        });

        let info = transporter.sendMail({
            from: "Codeshala || the warriors",
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`

        })
        return info;


    }
    catch (err) {
        console.log("problem occur while sending mail ", err.message)
        return null;
    }
}

module.exports = mailSender;