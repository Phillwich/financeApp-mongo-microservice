const { addData, readData, updateData, deleteData } = require('../datastore')
const { HTTPError } = require('../error/customError')
const { signToken, verifyToken } = require('../service/jwt')
const bcrypt = require('bcrypt')
const saltRounds = 10

const createUser = async (req, res, next) => {
  if (!req.body) return next(new HTTPError('Request body is missing', 400))
  try {
    const userAlreadyExists = await readData({ userName: req.body.userName })
    if (userAlreadyExists === null) return next(new HTTPError('User already exists', 409))
  } catch (error) {
    return next(new HTTPError(error.message, 500))
  }

  req.body.password = bcrypt.hashSync(req.body.password, saltRounds);
  
  try {
    const response = await addData(req.body)
    return res.json(response)
  } catch (error) {
    return next(new HTTPError(error.message, 500))
  }
}

const loginUser = async (req, res, next) => {
  if (!req.body) return next(new HTTPError('Request body is missing', 400))
  const searchData = {
    userName: req.body.userName
  }
  try {
    const response = await readData(searchData)
    if (response.data === null) return next(new HTTPError('User does not exist', 409))
    if (!bcrypt.compareSync(req.body.password, response.data.password)) return next(new HTTPError('Wrong password', 400))
    response.token = signToken(response.userId)
    return res.json(response)
  } catch (error) {
    return next(new HTTPError(error.message, 500))
  }
}

const getUser = async (req, res, next) => {
  if (!req.query.userId) return next(new HTTPError('UserId is missing', 400))
  if (!req.headers['x-access-token']) return next(new HTTPError('Access Token is missing', 400))
  if (!verifyToken(req.headers['x-access-token'])) return next(new HTTPError('Unauthorized', 401))
  try {
    const response = await readData(req.query)
    return res.json(response)
  } catch (error) {
    return next(new HTTPError(error.message, 500))
  }
}

const updateUser = async (req, res, next) => {
  if (!req.body) return next(new HTTPError('Request body is missing', 400))
  if (!req.headers['x-access-token']) return next(new HTTPError('Access Token is missing', 400))
  if (!verifyToken(req.headers['x-access-token'])) return next(new HTTPError('Unauthorized', 401))
  try {
    const response = await updateData(req.body)
    return res.json(response)
  } catch (error) {
    return next(new HTTPError(error.message, 500))
  }
}

const deleteUser = async (req, res, next) => {
  if (!req.quer.userId) return next(new HTTPError('UserId is missing', 400))
  if (!req.headers['x-access-token']) return next(new HTTPError('Access Token is missing', 400))
  if (!verifyToken(req.headers['x-access-token'])) return next(new HTTPError('Unauthorized', 401))
  try {
    const response = await deleteData(req.query)
    return res.json(response)
  } catch (error) {
    return next(new HTTPError(error.message, 500))
  }
}

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  loginUser
}