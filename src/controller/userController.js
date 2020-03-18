const { addData, readData, updateData, deleteData } = require('../datastore')
const { HTTPError } = require('../error/customError')
const { signToken } = require('../service/jwt')

const createUser = async (req, res, next) => {
  const userAlreadyExists = await readData({ userName: req.body.userName })
  if (userAlreadyExists !== null) return next(new HTTPError('User already exists', 409))
  const response = await addData(req.body)
  if (!response.success) return next(new HTTPError(response.error.message, 500))
  return res.json(response)
}

const loginUser = async (req, res, next) => {
  const response = await readData(req.body)
  if (!response.success) return next(new HTTPError(response.error.message, 500))
  if (response.data === null) return next(new HTTPError('User doesn´t exists', 404))
  response.token = signToken(response.userId)
  return res.json(response)
}

const getUser = async (req, res, next) => {
  const response = await readData(req.query)
  if (!response.success) return next(new HTTPError(response.error.message), 500)
  return res.json(response)
}

const updateUser = async (req, res, next) => {
  const response = await updateData(req.body)
  if (!response.success) return next(new HTTPError(response.error.message), 500)
  return res.json(response)
}

const deleteUser = async (req, res, next) => {
  const response = await deleteData(req.query)
  if (!response.success) return next(new HTTPError(response.error.message), 500)
  return res.json(response)
}

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  loginUser
}