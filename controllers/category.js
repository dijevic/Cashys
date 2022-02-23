const { response, request } = require('express')
const Category = require('../models/Category')
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

    await category.destroy()

    res.status(StatusCodes.OK).json({
        ok: true,
        status: StatusCodes.OK,
        msg: `category deleted successfully!`,


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