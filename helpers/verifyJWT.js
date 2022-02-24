const jwt = require('jsonwebtoken');

// this function handles the expired session .

const verifyJWT = async (token) => {


    return await jwt.verify(token, process.env.PRIVATESECRETJWTKEY, (err, decoded) => {


        const expiredAt = err?.expiredAt || false
        if (expiredAt) {
            return { expiredAt: err.expiredAt }

        } else if (err) {
            return false
        }


        return decoded
    })




}

module.exports = verifyJWT