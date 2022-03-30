
const { response, request } = require('express')
const Operation = require('../models/Operation')
const Category = require('../models/Category')
const { StatusCodes } = require('http-status-codes');



const createOperation = async (req = request, res = response) => {

    const user = req.user
    const balance = req.balance
    const category = req.category

    let { amount, description, operation_Type } = req.body

    const savedOperation = await Operation.create({
        amount,
        description,
        operation_Type,
        user_id: user.getDataValue('id'),
        category_id: category.getDataValue('id')
    })

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
        msg: `Operation created and Balance updated successfully!`,
        balance: savedBalance,
        operation: savedOperation


    })




}

const getOperationsByUser = async (req = request, res = response) => {

    const user = req.user
    const { rows, count } = await Operation.findAndCountAll({
        where: { user_id: user.getDataValue('id') },
        order: [
            ['date', 'DESC']
        ],
        include: {
            model: Category,
            as: 'category',
            attributes: ['name']
        },
        limit: 10
    })


    res.status(StatusCodes.OK).json({
        ok: true,
        status: StatusCodes.OK,
        msg: `success`,
        operations: rows,
        total: count,

    })



}
const getOperationsByUserFiltered = async (req = request, res = response) => {
    const user = req.user
    const params = req.query

    const data = { user_id: user.getDataValue('id') }



    if (params.operation_Type) {
        data.operation_Type = params.operation_Type
    }
    if (params.category_id) {
        const category = await Category.findOne({ where: { uuid: params.category_id } })
        data.category_id = category.getDataValue('id')
    }

    const { rows, count } = await Operation.findAndCountAll({
        where: data,
        order: [
            ['date', 'DESC']
        ],
        include: {
            model: Category,
            as: 'category',
            attributes: ['name']
        },
        limit: 10
    })


    res.status(StatusCodes.OK).json({
        ok: true,
        status: StatusCodes.OK,
        msg: `success`,
        operations: rows,
        total: count,


    })



}



const deleteOperation = async (req = request, res = response) => {

    const balance = req.balance
    const operation = req.operation


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

    const operation = req.operation
    const balance = req.balance

    let { amount, description } = req.body


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
    updateOperation,
    getOperationsByUserFiltered

}
