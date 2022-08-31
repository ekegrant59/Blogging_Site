require('dotenv').config()
const ejs = require('ejs')
const mongoose = require('mongoose')
const express = require('express')
const blogSchema = require('./blogSchema')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const userSchema = require('./userSchema')

const app = express()
const mongodb = process.env.MONGODB || 'mongodb://localhost:27017/blog'
mongoose.connect(mongodb)
.then(() => {
   console.log('Connection successful')
}).catch((err) => {
    console.log(err, "Connection failed")
})

app.set('view engine', 'ejs')
app.use('/assets', express.static('assets'))

app.use(express.urlencoded({extended: true}))

app.get('/', async (req,res)=>{
    const allPosts = await blogSchema.find()

    res.render('index', {posts: allPosts})
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


app.get('/login', (req,res)=>{
    res.render('login')
})

app.get('/register', (req,res)=>{
    res.render('register')
})

app.get('/addBlogs',(req,res)=>{
    res.render('addBlogs')
})

app.post('/login',(req,res)=>{
    res.render('processlogin')
})

app.post('/register', (req,res)=>{
    const regInfo = req.body
    // console.log(regInfo)

    registerUser()
    async function registerUser(){
        try{
            const user = new userSchema({
                username: regInfo.username,
                email: regInfo.email,
                password: regInfo.password
            })
            await user.save()
            res.redirect('login')
        } 
        catch(err){
            console.log(err)
        }

    }
})

const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`App started on port ${port}`)
} )
