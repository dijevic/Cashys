const { validationResult } = require('express-validator')
const { StatusCodes } = require('http-status-codes')

// middleware for express validator (check)


const validatefields = (req, res, next) => {
    const results = validationResult(req)


    if (!results.isEmpty()) {
        return res.status(404).json({
            ok: false,
            status: StatusCodes.BAD_REQUEST,
            msg: results.errors[0].msg

        })
    }
    next()

}

module.exports = validatefields
