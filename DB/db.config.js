const { Sequelize } = require('sequelize')


const dbconfig = {}

if (process.env.npm_lifecycle_event == 'dev') {
    dbconfig.db = 'cashy';
    dbconfig.userDB = 'root';
    dbconfig.passwordDB = null
    dbconfig.hostDB = 'localhost'
} else {
    dbconfig.db = process.env.DBNAME
    dbconfig.userDB = process.env.DBUSERNAME
    dbconfig.passwordDB = process.env.DBPASSWORD
    dbconfig.hostDB = process.env.DBHOST
}

const { db, userDB, passwordDB, hostDB } = dbconfig

const sequelize = new Sequelize(db, userDB, passwordDB, {
    host: hostDB,
    dialect: 'mysql',
    logging: false


});

module.exports = sequelize



