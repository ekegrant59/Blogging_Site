require('dotenv').config()
const ejs = require('ejs')
const mongoose = require('mongoose')
const express = require('express')
const blogSchema = require('./blogSchema')
import {env} from 'process'

const app = express()
mongoose.connect(process.env.MONGODB)
.then(() => {
   console.log('Connection successful')
}).catch((err) => {
    console.log(err, "Connection failed")
})

app.set('view engine', 'ejs')
app.use('/assets', express.static('assets'))

app.use(express.urlencoded({extended: true}))

app.get('/', (req,res)=>{
    res.render('index')
})
app.post('/success', (req,res)=>{
    const details = req.body

    run()
    async function run(){
        try {
            const blogs = new blogSchema({
                name: details.username,
                title: details.title,
                body: details.body
            })
            await blogs.save()
        }
        
         catch (err) {
            console.log(err.message)
        
        }
    }
    res.render('success')
})

app.get('/blogs', async (req,res) => {
    const allPosts = await blogSchema.find()

    res.render('blogs', {posts: allPosts})
})

const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`App started on port ${port}`)
} )
