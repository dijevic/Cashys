const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const { StatusCodes } = require('http-status-codes');

const validateJwtMiddleware = require('../helpers/verifyJWT');
const User = require('../models/User');


const validateJwt = async (req = request, res = response, next) => {

    let token = req.header('x-token')

    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            ok: false,
            status: StatusCodes.UNAUTHORIZED,
            msg: `unauthorized, missing JWT`
        })
    }

    try {


        const jwtVerified = await validateJwtMiddleware(token)


        if (!jwtVerified) return res.status(StatusCodes.BAD_REQUEST).json({
            msg: ` session expired`,
            ok: false,
            status: StatusCodes.BAD_REQUEST
        })

        const { data } = jwtVerified


        const { id } = data

        console.log(id)

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

    let token = req.header('x-token')


    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            ok: false,
            status: StatusCodes.UNAUTHORIZED,
            msg: `unauthorized, missing JWT`
        })
    }


    try {

        const jwtVerified = await validateJwtMiddleware(token)


        if (!jwtVerified) return res.status(StatusCodes.BAD_REQUEST).json({
            msg: ` session expired`,
            ok: false,
            status: StatusCodes.BAD_REQUEST
        })

        const { data } = jwtVerified
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

    let token = req.header('x-token')

    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            ok: false,
            status: StatusCodes.UNAUTHORIZED,
            msg: `unauthorized, missing JWT`
        })
    }

    try {

        const { data } = await validateJwtMiddleware(token)

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
