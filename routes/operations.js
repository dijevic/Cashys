const { Router } = require('express')
const { check } = require('express-validator')
const validatefields = require('../middlewares/validate')
const { validateJwt } = require('../middlewares/verifyJWT')
const { createOperation, getOperationsByUser, deleteOperation, updateOperation } = require('../controllers/operations')
const validateBalance = require('../middlewares/validateBalance')



const router = Router()


router.post('/', [
    validateJwt,
    check('amount', '  amount is required').not().isEmpty().exists().isNumeric().bail(),
    check('operation_Type', ' operation type is required').not().isEmpty().exists().isIn(['income', 'debt']).bail(),

    validateBalance,
    check('description', '  description is required').not().isEmpty().exists().bail(),
    validatefields
], createOperation)


router.get('/', [validateJwt], getOperationsByUser)

router.delete('/:uuid', [

    validateJwt,
    check('uuid').isUUID('4').not().isEmpty(),
    validatefields

], deleteOperation)
router.put('/:uuid', [

    validateJwt,
    check('uuid').isUUID('4').not().isEmpty(),
    validatefields

], updateOperation)



module.exports = router