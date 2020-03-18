const jwt = require('jsonwebtoken')

const signToken = (userId) => {
    return jwt.sign({ ...userId }, 'shhhhh', { expiresIn: 60 * 60 });
}

module.exports = {
    signToken
}