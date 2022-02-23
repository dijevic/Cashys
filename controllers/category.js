const { response, request } = require('express')
const Category = require('../models/Category')
const { StatusCodes } = require('http-status-codes');


const CreateCategory = async (req = request, res = response) => {

    const { name } = req.body
    const user = req.user



    const category = await Category.create({ name, UserId: user.getDataValue('id') })

    res.status(StatusCodes.OK).json({
        ok: true,
        status: StatusCodes.OK,
        msg: `success`,
        category

    })



}

const getCategoriesByUser = async (req = request, res = response) => {

    const user = req.user

    const { rows, count } = await Category.findAndCountAll({ where: { UserId: user.getDataValue('id') } })

    res.status(StatusCodes.OK).json({
        ok: true,
        status: StatusCodes.OK,
        msg: `success`,
        categories: rows,
        total: count,
    })



}



const deleteCategory = async (req = request, res = response) => {

    const { uuid } = req.params


    const category = await Category.findOne({ where: { uuid } })

    if (!category) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            ok: false,
            status: StatusCodes.BAD_REQUEST,
            msg: `something went wrong, there is not a category with that id`,
        })
    }

    await category.destroy()


    res.status(StatusCodes.OK).json({
        ok: true,
        status: StatusCodes.OK,
        msg: `category deleted successfully!`,


    })



}
const updateCategory = async (req = request, res = response) => {

    const { uuid } = req.params
    const { uuid: id, ...body } = req.body

    const category = await Category.findOne({ where: { uuid } })

    if (!category) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            ok: false,
            status: StatusCodes.BAD_REQUEST,
            msg: `something went wrong, there is not a category with that id`,
        })
    }

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