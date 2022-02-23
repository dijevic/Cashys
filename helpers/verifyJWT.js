const jwt = require('jsonwebtoken');

// this function handles the expired session .

const verifyJWT = async (token) => {


    return await jwt.verify(token, process.env.PRIVATESECRETJWTKEY, (err, decoded) => {

        if (err) {
            return false
        } else {
            return decoded
        }
    })







}

module.exports = verifyJWT