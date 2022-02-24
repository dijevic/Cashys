
// PATH : '/api/v1/balance'

const { Router } = require('express')
const { validateJwt } = require('../middlewares/verifyJWT')
const { getBalanceByUser } = require('../controllers/balance')
const { isValidToken } = require('../middlewares/dbValidators')



const router = Router()

router.get('/', [

    isValidToken,
    validateJwt,



], getBalanceByUser)




module.exports = router