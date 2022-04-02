const transporter = require('./transport')



const sendRecoverEmail = async (email, link, name) => {
    await transporter.sendMail({
        from: '"Cashys" <dijevic.developer@gmail.com>',
        to: `${email}`,
        subject: "Recover password",
        text: "here you have the link to recover your password",
        html: ` <p style="color: #000;font-size: 25px; text-align:center; width:100%; margin-bottom:25px;"> Hi ${name} !</p>
        <b>Recover your account with the following link</b><br>
        <a href="${link}" style="color: #000;font-size: 18px; text-align:center; width:100%; margin-bottom:25px; display:block;" >recovering link</a><br>
        <p style="color: #000;font-size: 16px; text-align:center; width:100%;">if the link does not work, please copy and paste the following link ${link} </p>`
    });
}
const sendRegistrationEmail = async (email, link, name) => {

    await transporter.sendMail({
        from: '"Cashys " <dijevic.developer@gmail.com>',
        to: `${email}`,
        subject: "confirm your email",
        text: "Confirm you email !",
        html: `<p style="color: #000;font-size: 25px; text-align:center; width:100%; margin-bottom:25px;">Hi ${name} ! here you have your link to finish the registration process</p>
        <a href="${link}" style="color: #000;font-size: 18px; text-align:center; width:100%; margin-bottom:25px; display:block;">  Finish the registration process  </a>
        <p style="color: #000;font-size: 16px; text-align:center; width:100%;">If the link does not work, please copy and paste the following link :
        <span style="font-weight:bold" font-size:18px;>${link}</span>
        </p>`
    })




}

module.exports = {
    sendRecoverEmail,
    sendRegistrationEmail
}