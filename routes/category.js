const { Router } = require('express')
const { check } = require('express-validator')
const validatefields = require('../middlewares/validate')
const { validateJwt } = require('../middlewares/verifyJWT')
const {
    CreateCategory,
    getCategoriesByUser,
    deleteCategory,
    updateCategory,
} = require('../controllers/category')
const { validateCategory } = require('../middlewares/dbVallidator')



const router = Router()






router.get('/',
    [
        validateJwt
    ],
    getCategoriesByUser)

router.post('/',
    [
        validateJwt,
        check('name').custom(validateCategory),
        validatefields
    ]
    , CreateCategory)
router.delete('/:uuid',
    [
        validateJwt,
        check('uuid').exists().isUUID('4'),
        validatefields
    ]
    , deleteCategory)
router.put('/:uuid',
    [
        validateJwt,
        check('uuid').exists().isUUID('4'),
        check('name', 'name is required').exists().not().isEmpty(),
        check('name').custom(validateCategory),
        validatefields
    ]
    , updateCategory)





module.exports = router