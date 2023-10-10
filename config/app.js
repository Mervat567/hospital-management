const express=require("express")
const app=express()
require('dotenv').config()
const connection=require('./database').connection
connection()

const userRoutes=require('../routes/user/user.route')

app.use(express.json())
app.use(userRoutes)


module.exports=app


