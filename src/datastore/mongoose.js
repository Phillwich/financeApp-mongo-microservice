const mongoose = require('mongoose')
const config = require('config')
const User = require('../model/user')

const createMongoConnection = async () => {
  await mongoose.connect(config.get('MONGO_URL'),
  { useUnifiedTopology: true,
    useNewUrlParser: true 
  })
  console.log('MONGODB connected')
}

const addData = async (payload) => {
  try {
    const user = new User({ ...payload })
    user.save()
    return { 
      success: true,
      message: `Successfully created ${payload.userId}`
    }
  } catch (error) {
    return {
      success: false,
      error
    }
  }
}

const readData = async (payload) => {
  try {
    const user = await User.findOne(payload)
    return {
      success: true,
      data: user,
      message: `Successfully found ${payload}`
    }
  } catch (error) {
    return {
      success: false,
      error
    }
  }
}

const updateData = async (payload) => {
  const { userId, data } = payload
  try {
    const user = await User.findOneAndUpdate({ userId: userId }, { ...data }, { new: true })
    return {
      success: true,
      data: user,
      message: `Successfully updatet ${userId}`
    }
  } catch (error) {
    return {
      success: false,
      error
    }
  }
}

const deleteData = async (payload) => {
  try {
    User.deleteOne({ ...payload })
    return {
      success: true,
      message: `Successfully deleted ${payload}`
    }
  } catch (error) {
    return {
      success: false,
      error
    }
  }
}

module.exports = {
  createMongoConnection,
  addData,
  readData,
  updateData,
  deleteData
}