const Category = require("./Category");
const Operation = require("./Operation");
const User = require("./User");
const Balance = require("./Balance");


// **** relations *****

User.hasMany(Operation, { foreignKey: 'user_id', as: 'operations' })
User.hasMany(Category, { foreignKey: 'user_id', as: 'categories' })
User.hasMany(Balance, { foreignKey: 'user_id', as: 'balance' })
Category.hasMany(Operation, { foreignKey: 'category_id', as: 'operations' })

