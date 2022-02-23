const JWT = require('jsonwebtoken')

const generateJWT = async (data) => {


    return new Promise((resolve, reject) => {


        JWT.sign({ data }, process.env.PRIVATESECRETJWTKEY, {
            expiresIn: '2h',

        }, (err, token) => {
            if (err) {
                return reject(`ups ! something wrong happend : ${err}`)
            } else {
                return resolve(token)
            }
        })
    })
}



module.exports = generateJWT 