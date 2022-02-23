const { response, request } = require('express');

const { StatusCodes } = require('http-status-codes');

const validateJwtMiddleware = require('../helpers/verifyJWT');
const User = require('../models/User');


const validateJwt = async (req = request, res = response, next) => {

    const token = req.token


    try {


        const { data } = await validateJwtMiddleware(token)


        if (!data) return res.status(StatusCodes.BAD_REQUEST).json({
            msg: `session expired`,
            ok: false,
            status: StatusCodes.BAD_REQUEST
        })





        if (data.type != 'user_verification') {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                ok: false,
                status: StatusCodes.UNAUTHORIZED,
                msg: `unauthorized, missing JWT`
            })
        }


        const { id } = data


        const user = await User.findOne({ where: { uuid: id } })
        if (!user) {
            return res.status(401).json({ msg: `user not found`, ok: false })
        }

        req.user = user
        next()



    } catch (error) {
        console.log(error)
        res.status(StatusCodes.UNAUTHORIZED).json({
            msg: `invalid JWT`,
            ok: 'something went wrong',
            status: StatusCodes.UNAUTHORIZED
        })
    }

}

const validateEmailJWT = async (req = request, res = response, next) => {

    const token = req.token


    try {

        const { data } = await validateJwtMiddleware(token)


        if (!data) return res.status(StatusCodes.BAD_REQUEST).json({
            msg: ` session expired`,
            ok: false,
            status: StatusCodes.BAD_REQUEST
        })



        if (data.type != 'email_verification') {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                ok: false,
                status: StatusCodes.UNAUTHORIZED,
                msg: `unauthorized, missing JWT`
            })
        }
        const { name, email, password } = data

        const user = await User.findOne({ where: { email } })

        if (user) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                ok: false,
                msg: `the Email is already registered`,
                status: StatusCodes.BAD_REQUEST
            })
        }

        req.userData = { name, email, password }
        next()



    } catch (error) {
        console.log(error)
        res.status(StatusCodes.UNAUTHORIZED).json({
            msg: `invalid JWT`,
            ok: 'something went wrong',
            status: StatusCodes.UNAUTHORIZED
        })
    }

}


const validateResetJWT = async (req = request, res = response, next) => {

    const token = req.token


    try {

        const { data } = await validateJwtMiddleware(token)

        if (data.type != 'reset_verification') {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                ok: false,
                status: StatusCodes.UNAUTHORIZED,
                msg: `unauthorized, missing JWT`
            })
        }

        const { id, password } = data

        const user = await User.findOne({ where: { uuid: id } })

        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                ok: false,
                status: StatusCodes.UNAUTHORIZED,
                msg: `user not found`


            })
        }
        if (user.getDataValue('resetToken') != token) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                ok: false,
                status: StatusCodes.UNAUTHORIZED,
                msg: `something went wrong`
            })
        }


        req.user = user
        req.password = password
        next()



    } catch (error) {
        console.log(error)
        res.status(StatusCodes.UNAUTHORIZED).json({
            msg: `invalid JWT`,
            ok: 'something went wrong',
            status: StatusCodes.UNAUTHORIZED
        })
    }



}




module.exports = { validateJwt, validateEmailJWT, validateResetJWT }
