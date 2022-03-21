const { response, request } = require('express');

const { StatusCodes } = require('http-status-codes');

const dayjs = require('dayjs')




const validateJwtMiddleware = require('../helpers/verifyJWT');
const User = require('../models/User');


const validateJwt = async (req = request, res = response, next) => {

    const token = req.token
    console.log(token)

    try {

        const jwtVerified = await validateJwtMiddleware(token)



        if (jwtVerified.expiredAt) {
            const day = dayjs(jwtVerified.expiredAt).format('MM-DD-YYYY')
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg: `session expired at ${day}`,
                ok: false,
                status: StatusCodes.BAD_REQUEST
            })

        }

        if (!jwtVerified) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg: `invalid signature`,
                ok: false,
                status: StatusCodes.BAD_REQUEST,
                test: 'aqui'
            })
        }



        const { data } = jwtVerified

        if (data.type != 'user_verification') {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                ok: false,
                status: StatusCodes.UNAUTHORIZED,
                msg: `unauthorized, missing JWT`,
                data
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

        const jwtVerified = await validateJwtMiddleware(token)


        if (jwtVerified.expiredAt) {
            const day = dayjs(jwtVerified.expiredAt).format('MM-DD-YYYY')
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg: `session expired at ${day}`,
                ok: false,
                status: StatusCodes.BAD_REQUEST
            })

        }

        // 2

        if (!jwtVerified) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg: `invalid signature`,
                ok: false,
                status: StatusCodes.BAD_REQUEST
            })
        }


        const { data } = jwtVerified

        // aqui 2

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

        const jwtVerified = await validateJwtMiddleware(token)


        if (jwtVerified.expiredAt) {
            const day = dayjs(jwtVerified.expiredAt).format('MM-DD-YYYY')
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg: `session expired at ${day}`,
                ok: false,
                status: StatusCodes.BAD_REQUEST
            })

        }
        // 3
        if (!jwtVerified) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg: `invalid signature`,
                ok: false,
                status: StatusCodes.BAD_REQUEST
            })
        }

        const { data } = jwtVerified

        if (data.type != 'reset') {
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg: `invalid token x`,
                ok: false,
                status: StatusCodes.BAD_REQUEST
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


        if (user.getDataValue('resetToken').toString() != token.toString()) {
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
            ok: 'false',
            status: StatusCodes.UNAUTHORIZED
        })
    }



}




module.exports = { validateJwt, validateEmailJWT, validateResetJWT }
