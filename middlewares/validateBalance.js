const { StatusCodes } = require("http-status-codes")

const validateBalance = async (req, res, next) => {

    const balance = req.balance
    const { operation_Type, amount } = req.body


    const numbBalance = Number(balance.amount)



    if (numbBalance == 0 && operation_Type == 'debt') {
        return res.status(StatusCodes.BAD_REQUEST).json({
            ok: false,
            status: StatusCodes.BAD_REQUEST,
            msg: `Balance cannot be negative`,
        })
    }



    if (numbBalance - Number(amount) < 0 && operation_Type == 'debt') {
        return res.status(StatusCodes.BAD_REQUEST).json({
            ok: false,
            status: StatusCodes.BAD_REQUEST,
            msg: `Balance cannot be negative`,
        })
    }
    next()


}









module.exports = { validateBalance }