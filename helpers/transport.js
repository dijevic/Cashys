const nodemailer = require("nodemailer")

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAILUSER,
        pass: process.env.EMAILTRANSPORTERKEY,
    },
    tls: {
        rejectUnauthorized: false
    }
});


transporter.verify().then(() => {
    console.log('Ready for sending emails !')
})

module.exports = transporter