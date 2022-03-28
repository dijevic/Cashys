const { response, request } = require('express')
const Category = require('../models/Category')
const Balance = require('../models/Balance')
const Operation = require('../models/Operation')
const { StatusCodes } = require('http-status-codes');


const CreateCategory = async (req = request, res = response) => {

    const { name } = req.body
    const user = req.user



    const category = await Category.create({ name, user_id: user.getDataValue('id') })

    res.status(StatusCodes.OK).json({
        ok: true,
        status: StatusCodes.OK,
        msg: `success`,
        category

    })

}



const getCategoriesByUser = async (req = request, res = response) => {

    const user = req.user

    const { rows, count } = await Category.findAndCountAll({ where: { user_id: user.getDataValue('id') } })

    res.status(StatusCodes.OK).json({
        ok: true,
        status: StatusCodes.OK,
        msg: `success`,
        categories: rows,
        total: count,
    })



}



const deleteCategory = async (req = request, res = response) => {


    const category = req.category
    const user = req.user
    const operations = await Operation.findAll({ where: { category_id: category.getDataValue('id') } })
    const debts = operations.filter((op) => op.operation_Type == 'debt')
    const incomes = operations.filter((op) => op.operation_Type == 'income')

    const balance = await Balance.findOne({ where: { user_id: user.getDataValue('id') } })

    // balance the incomes
    let debtBalance = 0
    let incomeBalance = 0
    let finalBalance = 0
    debts.forEach((op) => {
        debtBalance += op.amount

    })
    incomes.forEach((op) => {
        incomeBalance += op.amount

    })


    finalBalance = Number(balance.amount) - Number(incomeBalance) + Number(debtBalance)


    const savedBalance = balance.set({ amount: finalBalance })
    await savedBalance.save()

    await category.destroy()

    res.status(StatusCodes.OK).json({
        ok: true,
        status: StatusCodes.OK,
        msg: `category deleted successfully!`,
        balance: savedBalance,
        operations


    })

}


const updateCategory = async (req = request, res = response) => {

    const { uuid, ...body } = req.body

    const category = req.category

    category.set(body)

    await category.save()


    res.status(StatusCodes.OK).json({
        ok: true,
        status: StatusCodes.OK,
        msg: `category updated successfully!`,
        category


    })

}




module.exports = {
    CreateCategory,
    getCategoriesByUser,
    deleteCategory,
    updateCategory
}