const jwt = require('jsonwebtoken')

const signToken = (userId) => {
    return jwt.sign({ ...userId }, 'shhhhh', { expiresIn: 60 * 60 });
}

const verifyToken = (token) => {
    return jwt.verify(token, 'shhhhh')
}

module.exports = {
    signToken,
    verifyToken
}