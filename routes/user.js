const { Router } = require('express')
const { validateJwt } = require('../middlewares/verifyJWT')
const { updateUser, deleteUser } = require('../controllers/user')

const router = Router()
router.use(validateJwt)


router.put('/', updateUser)
router.delete('/', deleteUser)

module.exports = router