const { addData, readData, updateData, deleteData } = require('../datastore')
const { HTTPError } = require('../error/customError')
const { signToken } = require('../service/jwt')

const createUser = async (req, res, next) => {
  try {
    const userAlreadyExists = await readData({ userName: req.body.userName })
    if (userAlreadyExists === null) return next(new HTTPError('User already exists', 409))
  } catch (error) {
    return next(new HTTPError(error.message), 500)
  }

  try {
    const response = await addData(req.body)
    return res.json(response)
  } catch (error) {
    return next(new HTTPError(error.message), 500)
  }
}

const loginUser = async (req, res, next) => {
  try {
    const response = await readData(req.body)
    if (response.data === null) return next(new HTTPError('User does not exist', 409))
    response.token = signToken(response.userId)
    return res.json(response)
  } catch (error) {
    return next(new HTTPError(error.message), 500)
  }
}

const getUser = async (req, res, next) => {
  try {
    const response = await readData(req.query)
    return res.json(response)
  } catch (error) {
    return next(new HTTPError(error.message), 500)
  }
}

const updateUser = async (req, res, next) => {
  try {
    const response = await updateData(req.body)
    return res.json(response)
  } catch (error) {
    return next(new HTTPError(error.message), 500)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const response = await deleteData(req.query)
    return res.json(response)
  } catch (error) {
    return next(new HTTPError(error.message), 500)
  }
}

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  loginUser
}