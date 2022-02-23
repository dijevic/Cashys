const { response, request } = require('express')
const Balance = require('../models/Balance')
const { StatusCodes } = require('http-status-codes');





const getBalanceByUser = async (req = request, res = response) => {

    const user = req.user

    const { rows } = await Balance.findAndCountAll({ where: { UserId: user.getDataValue('id') } })

    res.status(StatusCodes.OK).json({
        ok: true,
        status: StatusCodes.OK,
        msg: `success`,
        balance: rows,

    })



}


module.exports = {
    getBalanceByUser,
}