const { StatusCodes } = require('http-status-codes');


const Category = require('../models/Category')
const Operation = require('../models/Operation')
const User = require('../models/User')
const Balance = require('../models/Balance');


const isBalance = async (req, res, next) => {
    const user = req.user

    const balance = await Balance.findOne({ where: { user_id: user.getDataValue('id') } })


    if (!balance) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            ok: false,
            status: StatusCodes.BAD_REQUEST,
            msg: `something went wrong,  there is not a Balance related with the user`,
        })
    }

    req.balance = balance

    next()
}

const isCategory = async (req, res, next) => {

    const uuid = req.body.category_id || req.params.uuid

    const category = await Category.findOne({ where: { uuid } })


    if (!category) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            ok: false,
            status: StatusCodes.BAD_REQUEST,
            msg: `something went wrong,  there is not a Category related with the user`,
        })
    }

    req.category = category

    next()
}
const isOperation = async (req, res, next) => {

    const { uuid } = req.params

    if (!uuid) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            ok: false,
            status: StatusCodes.BAD_REQUEST,
            msg: `an UUID is required for this operation`,
        })

    }
    const operation = await Operation.findOne({ where: { uuid } })
    if (!operation) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            ok: false,
            status: StatusCodes.BAD_REQUEST,
            msg: `something went wrong,there is not a operation related with the id : ${uuid}`,
        })
    }

    req.operation = operation

    next()
}
const isBody = async (req, res, next) => {



    const arrBody = Object.values(req.body)


    if (arrBody.length === 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            msg: `body is required`,
            status: StatusCodes.BAD_REQUEST,
            ok: false
        })
    }



    next()
}
const isValidEmail = async (req, res, next) => {


    const { email } = req.body

    if (!email) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            ok: false,
            status: StatusCodes.BAD_REQUEST,
            msg: `an email is required`,
        })

    }


    const userEmail = await User.findOne({ where: { email } })

    if (userEmail) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            msg: `invalid email , an user already exist in DB with the email ${email}`,
            status: StatusCodes.BAD_REQUEST,
            ok: false
        })
    }






    next()
}
const isInvalidValidEmail = async (req, res, next) => {


    const { email } = req.body
    if (!email) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            ok: false,
            status: StatusCodes.BAD_REQUEST,
            msg: `an email is required`,
        })

    }


    const userEmail = await User.findOne({ where: { email } })

    if (!userEmail) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            msg: `unsuccess, email or password wrong correo`,
            status: 400,
            ok: false

        })
    }

    req.user = userEmail


    next()
}
const validateCategoryByName = async (req, res, next) => {


    const { name } = req.body

    if (!name) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            ok: false,
            status: StatusCodes.BAD_REQUEST,
            msg: `a category name is required`,
        })

    }

    const user = req.user
    const category = await Category.findOne({ where: { name, user_id: user.getDataValue('id') } })

    if (category) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            msg: `category already exist`,
            status: StatusCodes.BAD_REQUEST,
            ok: false
        })
    }


    next()
}
const isValidToken = async (req, res, next) => {


    let token = req.header('x-token')
    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            ok: false,
            status: StatusCodes.UNAUTHORIZED,
            msg: `unauthorized, missing JWT `
        })
    }

    req.token = token



    next()
}



module.exports = {
    isBalance,
    isCategory,
    isOperation,
    isBody,
    isValidEmail,
    isInvalidValidEmail,
    validateCategoryByName,
    isValidToken

}