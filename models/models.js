const Category = require("./Category");
const Operation = require("./Operation");
const User = require("./User");
const Balance = require("./Balance");


User.hasMany(Operation)
User.hasMany(Category)
User.hasMany(Balance)
Category.hasMany(Operation)

module.exports = {
    User,
    Category,
    Operation,
    Balance
}