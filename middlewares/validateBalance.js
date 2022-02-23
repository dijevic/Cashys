const { StatusCodes } = require("http-status-codes")
const Balance = require("../models/Balance")

const validateBalance = async (req, res, next) => {

    const user = req.user
    const { operation_Type, amount } = req.body

    const balance = await Balance.findOne({ where: { UserId: user.getDataValue('id') } })

    const numbBalance = Number(balance.amount)



    if (!balance) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            ok: false,
            status: StatusCodes.BAD_REQUEST,
            msg: `something went wrong, there is not a Balance related with the user`,
        })
    }



    if (numbBalance == 0 && operation_Type == 'debt') {
        return res.status(StatusCodes.BAD_REQUEST).json({
            ok: false,
            status: StatusCodes.BAD_REQUEST,
            msg: `Balance can ot be negative`,
        })
    }



    if (numbBalance - Number(amount) < 0 && operation_Type == 'debt') {
        return res.status(StatusCodes.BAD_REQUEST).json({
            ok: false,
            status: StatusCodes.BAD_REQUEST,
            msg: `Balance can ot be negative`,
        })
    }
    next()


}




module.exports = validateBalance