const mongoose = require('mongoose')
const mongodb = process.env.MONGODB || 'mongodb://localhost:27017/blog'
mongoose.connect(mongodb)

const blogSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    title : {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
})

module.exports =  mongoose.model('myblog', blogSchema)
