const mongoose = require('mongoose')
const mongodb = process.env.MONGODB || 'mongodb://localhost:27017/blog'
mongoose.connect(mongodb)

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
})

module.exports = mongoose.model('user', userSchema)