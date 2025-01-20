require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connection = require('./utils/config');
const Router = require('./Routes/user');
const router = require('./Routes/blog');


const app=express()

//middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    return res.send("Backend is running successfully")
})

//Port
const PORT=process.env.PORT;

app.use('/api/user',Router)

app.use('/blog',router)
//Database conectivity
connection()
.then(()=>{
console.log("Database connected successfully");
//server
})
app.listen((PORT),()=>{
    console.log(`server has been started ${PORT}`);

})
