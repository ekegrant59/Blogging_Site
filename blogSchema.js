const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://myFirstBlog:0phEn1Ft4GyFHe3j@nodeapps.mizczy3.mongodb.net/blog')

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
