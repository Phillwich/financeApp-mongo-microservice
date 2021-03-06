const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String },
    password: { type: String },
    balance: { type: Number, default: 0 },
    userId: { type: String },
    balanceChanges: [
        {
            note: { type: String },
            amount: { type: Number },
            kind: { type: String }
        }
    ]
})

module.exports = mongoose.model('User', userSchema)