const jwt = require('jsonwebtoken')

const generateToken = (userData = {}) => {
    try {
        const payload = { userData }
        const secret = process.env.SECRET_KEY
        const token = jwt.sign(payload, secret, {
            expiresIn: '2h'
        })

        return token
    } catch(error) {
        console.log(error)

        return false
    }
}

module.exports = {
    generateToken
}