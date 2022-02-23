const bcrypt = require('bcrypt')


const encript = (password) => {

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    return hash

}

const checkPassword = (password, passwordDB) => {
    return bcrypt.compareSync(password, passwordDB)
}

module.exports = { encript, checkPassword }