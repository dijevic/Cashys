
// PATH: '/api/v1/categories'

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

const { validateCategoryByName, isCategory } = require('../middlewares/dbValidators')
const { isValidToken } = require('../middlewares/dbValidators')



const router = Router()




router.get('/',
    [

        isValidToken,
        validateJwt
    ],
    getCategoriesByUser)

router.post('/',
    [
        isValidToken,
        validateJwt,
        validateCategoryByName,
        check('name', 'name is required').exists().not().isEmpty(),
        validatefields
    ]
    , CreateCategory)
router.delete('/:uuid',
    [
        isValidToken,
        validateJwt,
        isCategory,
        check('uuid').exists().isUUID('4'),
        validatefields
    ]
    , deleteCategory)
router.put('/:uuid',
    [
        isValidToken,
        validateJwt,
        check('uuid').exists().isUUID('4'),
        isCategory,
        validateCategoryByName,

        check('name', 'name is required').exists().not().isEmpty(),
        validatefields
    ]
    , updateCategory)





module.exports = router