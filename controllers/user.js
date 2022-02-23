const { response, request } = require('express')
const { StatusCodes } = require('http-status-codes')
const generateJWT = require('../helpers/generateJWT')
const { encript } = require('../helpers/encript')

const updateUser = async (req = request, res = response) => {

    try {
        let { resetToken, id, uuid, email, ...body } = req.body
        const user = req.user
        const arrBody = Object.values(body)


        if (arrBody.length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg: `body is required`,
                status: StatusCodes.BAD_REQUEST,
                ok: false

            })
        }

        if (body.password.trim().length === 0) {
            delete body.password

        }

        if (body.name.trim().length === 0) {
            delete body.name
        }


        if (body.password) {
            body.password = encript(body.password)

        }

        if (body.name) {
            body.name = body.name.toLowerCase()
        }

        const userUpdated = user.set(body)

        await userUpdated.save()
        const token = await generateJWT(user.uuid)

        res.status(StatusCodes.OK).json({
            ok: true,
            status: StatusCodes.OK,
            msg: 'user Updated !',
            id: userUpdated.uuid,
            name: userUpdated.name,
            email: userUpdated.email,
            token
        })

    } catch (e) {
        res.json({
            ok: false,
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            msg: `unsuccess`,

        })
        throw new Error(e)
    }
}

const deleteUser = async (req = request, res = response) => {


    try {

        const user = req.user

        await user.destroy()

        res.status(StatusCodes.OK).json({
            ok: true,
            status: StatusCodes.OK,
            msg: 'user deleted !',
        })

    } catch (e) {
        res.json({
            ok: false,
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            msg: `unsuccess`,

        })
        throw new Error(e)
    }
}




module.exports = {
    updateUser,
    deleteUser
}