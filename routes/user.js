
// PATH: : '/api/v1/user'

const { Router } = require('express')
const { validateJwt } = require('../middlewares/verifyJWT')
const { updateUser, deleteUser } = require('../controllers/user')
const { isBody } = require('../middlewares/dbValidators')
const { isValidToken } = require('../middlewares/dbValidators')


const router = Router()
router.use(isValidToken)
router.use(validateJwt)


router.put('/', [

    isBody
], updateUser)
router.delete('/', deleteUser)

module.exports = router