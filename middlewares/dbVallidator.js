const Balance = require("../models/Balance")
const Category = require("../models/Category")
const User = require("../models/User")

const validEmail = async (email) => {


    const userEmail = await User.findOne({
        where: { email }
    })

    if (userEmail) {
        throw new Error(`E-mail already in use`)
    }

}

const notValidEmail = async (email) => {
    const userEmail = await User.findOne({
        where: { email }
    })

    if (!userEmail) {
        throw new Error(`invalid email`)
    }

}
const validateCategory = async (name) => {
    const category = await Category.findOne({
        where: { name }
    })

    if (category) {
        throw new Error(`category already in use`)
    }

}






module.exports = {
    validEmail,
    notValidEmail,
    validateCategory,
}