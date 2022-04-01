const express = require('express');
const cors = require('cors');
const sequelize = require('../DB/db.config');
const notFound = require('../middlewares/notFound');
const helmet = require("helmet");
require('./models')



class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.paths = {
            auth: '/api/v1/auth',
            user: '/api/v1/user',
            categories: '/api/v1/categories',
            balance: '/api/v1/balance',
            operation: '/api/v1/operation',
        }
        this.dbConection()
        this.middlewares()
        this.routes()


    }

    async dbConection() {

        try {
            await sequelize.authenticate()
            console.log('Connection has been established successfully.')

        } catch (error) {
            console.log({ error })
        }


    }

    middlewares() {
        this.app.use(express.static('public'))
        this.app.use(express.json())
        this.app.use(cors())
        this.app.use(helmet())
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.user, require('../routes/user'))
        this.app.use(this.paths.categories, require('../routes/category'))
        this.app.use(this.paths.balance, require('../routes/balance'))
        this.app.use(this.paths.operation, require('../routes/operations'))
        this.app.use(notFound)

    }

    listen() {

        this.app.listen(this.port, () => {
            console.log(`Server running on PORT *${this.port}*`)
        })

    }




}

module.exports = {
    Server
}



