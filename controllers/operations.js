
const { response, request } = require('express')
const Operation = require('../models/Operation')
const { StatusCodes } = require('http-status-codes');
const Balance = require('../models/Balance');
const Category = require('../models/Category');


const createOperation = async (req = request, res = response) => {

    const user = req.user
    let { amount, description, operation_Type, CategoryId } = req.body

    const balance = await Balance.findOne({ where: { UserId: user.getDataValue('id') } })
    const category = await Category.findOne({ where: { uuid: CategoryId } })



    if (!category) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            ok: false,
            status: StatusCodes.BAD_REQUEST,
            msg: `something went wrong, there is not a category related with the ID`,
        })
    }


    const savedOperation = await Operation.create({
        amount,
        description,
        operation_Type,
        UserId: user.getDataValue('id'),
        CategoryId: category.getDataValue('id')
    })

    // ajusto el balance 
    let newBalance = 0


    switch (operation_Type) {
        case 'debt':
            newBalance = Number(balance.amount) - Number(amount);
            break;
        case 'income':
            newBalance = Number(balance.amount) + Number(amount);

        default:
            break;
    }



    const savedBalance = await balance.set({ amount: newBalance })
    await savedBalance.save()

    res.status(StatusCodes.OK).json({
        ok: true,
        status: StatusCodes.OK,
        msg: `Balance updated successfully!`,
        balance: savedBalance,
        operation: savedOperation


    })




}

const getOperationsByUser = async (req = request, res = response) => {

    const user = req.user

    const { rows, count } = await Operation.findAndCountAll({ where: { UserId: user.getDataValue('id') } })


    res.status(StatusCodes.OK).json({
        ok: true,
        status: StatusCodes.OK,
        msg: `success`,
        operations: rows,
        total: count,
    })



}



const deleteOperation = async (req = request, res = response) => {

    const { uuid } = req.params
    const user = req.user


    const operation = await Operation.findOne({ where: { uuid } })
    const balance = await Balance.findOne({ where: { UserId: user.getDataValue('id') } })
    if (!operation) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            ok: false,
            status: StatusCodes.BAD_REQUEST,
            msg: `something went wrong, there is not a Balance related with the user`,
        })
    }

    if (!balance) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            ok: false,
            status: StatusCodes.BAD_REQUEST,
            msg: `balance not related with the user`,
        })
    }

    let newBalance = 0


    switch (operation.operation_Type) {
        case 'debt':
            newBalance = Number(balance.amount) + Number(operation.amount);
            break;
        case 'income':
            newBalance = Number(balance.amount) - Number(operation.amount);

        default:
            break;
    }
    const savedBalance = await balance.set({ amount: newBalance })
    await savedBalance.save()


    await operation.destroy()


    res.status(StatusCodes.OK).json({
        ok: true,
        status: StatusCodes.OK,
        msg: `Operation deleted successfully!`,
        balance: savedBalance


    })



}
const updateOperation = async (req = request, res = response) => {

    const { uuid } = req.params
    const user = req.user

    const arrBody = Object.values(req.body)


    if (arrBody.length === 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            msg: `body is required`,
            status: StatusCodes.BAD_REQUEST,
            ok: false
        })
    }


    let { amount, description } = req.body


    const operation = await Operation.findOne({ where: { uuid } })
    const balance = await Balance.findOne({ where: { UserId: user.getDataValue('id') } })

    if (!operation) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            ok: false,
            status: StatusCodes.BAD_REQUEST,
            msg: `something went wrong, there is not a operation with that id`,
        })
    }
    if (!balance) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            ok: false,
            status: StatusCodes.BAD_REQUEST,
            msg: `balance not related with the user`,
        })
    }

    let newBalance = 0
    let data = {}

    let savedBalance;


    if (amount) {


        switch (operation.operation_Type) {
            case 'debt':
                newBalance = Number(balance.amount) + Number(operation.amount) - Number(amount);
                break;
            case 'income':
                newBalance = Number(balance.amount) - Number(operation.amount) + Number(amount);

            default:
                break;
        }


        data.amount = amount
        savedBalance = await balance.set({ amount: newBalance })
        await savedBalance.save()
    }


    if (description) {
        data.description = description
    }



    const savedOperation = operation.set(data)

    await savedOperation.save()


    res.status(StatusCodes.OK).json({
        ok: true,
        status: StatusCodes.OK,
        msg: `Operation updated successfully!`,
        operation: savedOperation,
        balance: (savedBalance) ? savedBalance : balance.amount


    })

}




module.exports = {
    createOperation,
    getOperationsByUser,
    deleteOperation,
    updateOperation

}
