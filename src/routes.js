const routes = require('express').Router()
const { createUser, getUser, updateUser, deleteUser, loginUser } = require('./controller')

module.exports = () => {

    routes.post('/login', loginUser)
    routes.post('/user', createUser)
    routes.get('/user', getUser)
    routes.put('/user', updateUser)
    routes.delete('/user', deleteUser)

    return routes
}