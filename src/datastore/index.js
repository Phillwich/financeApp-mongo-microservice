const { createMongoConnection, addData, readData, updateData, deleteData } = require('./mongoose')

module.exports = {
    createMongoConnection,
    addData,
    readData,
    updateData,
    deleteData
}