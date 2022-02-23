const { Router } = require('express')
const { validateJwt } = require('../middlewares/verifyJWT')
const { getBalanceByUser } = require('../controllers/balance')
// const { valid } = require('../middlewares/dbVallidator')



const router = Router()

router.get('/', [

    validateJwt

], getBalanceByUser)




module.exports = router