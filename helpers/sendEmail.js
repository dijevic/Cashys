const transporter = require('./transport')



const sendRecoverEmail = async (email, link, name) => {
    await transporter.sendMail({
        from: '"Calendar app " <dijevic.developer@gmail.com>',
        to: `${email}`,
        subject: "recover password",
        text: "here you have the link to recover your password",
        html: ` 
        <b>Recover your account with the following link</b><br>
        <a href="${link}">recovering link</a><br>
        <p>if the link does not work, please copy and paste the following link ${link} </p>`
    });
}
const sendRegistrationEmail = async (email, link, name) => {

    await transporter.sendMail({
        from: '"Tasky " <dijevic.developer@gmail.com>',
        to: `${email}`,
        subject: "confirm your email",
        text: "Confirm you email !",
        html: `<p>Hi ${name} ! here you have your link to finish the registration process</p>
        <a href="${link}">  <b>Finish the registration</b>  </a><br><br>
        <p>if the link does not work, please copy and paste the following link ${link} </p>`
    })




}

module.exports = {
    sendRecoverEmail,
    sendRegistrationEmail
}