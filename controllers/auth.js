const { response, request } = require('express')
const User = require('../models/User')
const { encript, checkPassword } = require('../helpers/encript')
const { sendRecoverEmail, sendRegistrationEmail } = require('../helpers/sendEmail')
const generateJWT = require('../helpers/generateJWT')
const Category = require('../models/Category')
const Balance = require('../models/Balance')
const { StatusCodes } = require('http-status-codes');




const renewUserToken = async (req = request, res = response) => {

    try {

        const user = req.user
        const token = await generateJWT({ id: user.uuid, type: 'user_verification' })

        res.status(StatusCodes.OK).json({
            ok: true,
            status: StatusCodes.OK,
            msg: 'token checked',
            id: user.uuid,
            name: user.name,
            email: user.email,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            ok: false,
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            msg: 'something went wrong'
        })
    }

}


const loginUser = async (req = request, res = response) => {

    try {

        const user = req.user
        const { password } = req.body




        const validPassword = checkPassword(password, user.getDataValue('password'))

        if (!validPassword) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg: `unsuccess, email or password wrong`,
                status: 400,
                ok: false
            })
        }


        const token = await generateJWT({ id: user.uuid, type: 'user_verification' })

        res.status(StatusCodes.OK).json({
            ok: true,
            status: StatusCodes.OK,
            msg: 'success login',
            id: user.uuid,
            name: user.name,
            email: user.email,
            token

        })


    } catch (error) {
        console.log(e)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            ok: false,
            status: 500,
            msg: 'something went wrong '
        })
    }



}

const createUser = async (req = request, res = response) => {

    let { password, email, name } = req.userData

    const data = {
        name: name.toLowerCase(),
        email: email.toLowerCase(),
        password: encript(password)

    }

    const user = await User.create(data)
    await Category.create({ name: 'General', user_id: user.getDataValue('id') })
    await Balance.create({ user_id: user.getDataValue('id') })

    const token = await generateJWT({ id: user.uuid, type: 'user_verification' })

    res.status(StatusCodes.CREATED).json({
        ok: true,
        msg: 'success register',
        status: StatusCodes.CREATED,
        token,
        name: user.name,
        email: user.email,
        id: user.uuid
    })


}


const forgotPassword = async (req = request, res = response) => {
    const { password } = req.body

    const user = req.user



    const verifyPassword = checkPassword(password, user.getDataValue('password'))

    if (verifyPassword) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            ok: false,
            status: StatusCodes.BAD_REQUEST,
            msg: `You have to set a password different to your last one`
        })
    }



    const resetToken = await generateJWT({ id: user.uuid, password })
    user.resetToken = resetToken
    await user.save()








    // const link = `https://taskys.netlify.app/auth/change-password/${resetToken}`
    // change reset token for link once i have the forntend link

    // try {

    //     ssendRecoverEmail(email, link)

    // } catch (e) {
    //     console.log(e)
    //     return res.status(StatusCodes.NOT_FOUND).json({
    //         ok: false,
    //         status: StatusCodes.NOT_FOUND,
    //         msg: `it was impossible to send the email`,
    //     })
    // }


    res.status(StatusCodes.OK).json({
        ok: true,
        status: StatusCodes.OK,
        msg: 'a link was send to your email !',
        resetToken
        // link,

    })


}

const changePaswword = async (req = request, res = response) => {

    const user = req.user
    const password = req.password


    const data = {
        password: encript(password),
        resetToken: null
    }

    await user.update(data)
    const token = await generateJWT({ id: user.uuid, type: 'user_verification' })

    res.status(StatusCodes.OK).json({
        ok: true,
        status: StatusCodes.OK,
        msg: 'password has been changed successfully',
        id: user.uuid,
        name: user.name,
        token
    })

}


const emailVerification = async (req = request, res = response) => {


    const { email, password, name } = req.body


    // genero JWT 
    const token = await generateJWT({ email, password, name, type: 'email_verification' })

    // add the correct link once i have in hand the link
    // dont forget to add the registration email function


    // const link = `https://taskys.netlify.app/auth/finish-registration/${token}`


    // try {

    //     sendRegistrationEmail(email, link)

    // } catch (e) {
    //     console.log(e)
    //     return res.status(StatusCodes.NOT_FOUND).json({
    //         ok: false,
    //         status: StatusCodes.NOT_FOUND,
    //         msg: `it was impossible to send the email`,
    //     })
    // }

    res.status(StatusCodes.OK).json({
        ok: true,
        status: StatusCodes.OK,
        msg: 'an email has been send to your email !',
        // link
        token
    })


}







module.exports = {
    renewUserToken,
    loginUser,
    createUser,
    forgotPassword,
    changePaswword,
    emailVerification,


}