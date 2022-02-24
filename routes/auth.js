// PATH: '/api/v1/auth'


const { Router } = require('express')
const { check } = require('express-validator')
const { createUser,
    emailVerification,
    loginUser,
    forgotPassword,
    changePaswword,
    renewUserToken } = require('../controllers/auth')
const validarCampos = require('../middlewares/validate')
const { validateEmailJWT, validateJwt, validateResetJWT } = require('../middlewares/verifyJWT')
const { isValidEmail, isInvalidValidEmail, } = require('../middlewares/dbValidators')
const { isValidToken } = require('../middlewares/dbValidators')



const router = Router()



//  ****EMAIL VERIFICATION***
router.post('/validate-email',

    [
        check('email', 'must be an valid email').isEmail().bail(),
        isValidEmail,

        check('password', 'password length must be over 6 characters').trim().isLength({ min: 6 }).bail(),
        check('name', 'name is required').not().isEmpty().bail(),
        validarCampos

    ], emailVerification)

// ***CREATE USER***

router.post('/new-user',
    [

        isValidToken,
        validateEmailJWT
    ], createUser)



// ***LOGIN***

router.post('/login', [

    check('email', 'email is required').isEmail().bail(),
    isInvalidValidEmail,
    check('password', 'password is required').trim().not().isEmpty(),
    validarCampos
], loginUser)


// *** RENEW USER TOKEN ***

router.get('/renew',
    [

        check('x-token').isJWT(),
        isValidToken,
        validateJwt,

    ], renewUserToken)


router.put('/forgot-password',

    [
        isInvalidValidEmail,
        check('email', 'must be a valid Email').isEmail().bail(),
        check('password', 'password length must be over 6 characters').trim().isLength({ min: 6 }),
        validarCampos

    ], forgotPassword)

router.put('/change-password',

    [

        check('x-token').isJWT(),
        isValidToken,
        validateResetJWT

    ], changePaswword)



module.exports = router



