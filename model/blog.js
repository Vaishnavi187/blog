const mongoose = require('mongoose');

const blogschema=mongoose.Schema({
    title:{
        type:String,
        require:[true,'title is reqired']
    },
    description:{
        type:String,
        require:[true,'Description is reqired']
    },
    image:{
        type:String,
        require:[true,'Image is reuired']
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        require:[true,"user id is required"]
    }
},{timestamps:true})

const blog=mongoose.model('Blog',blogschema)
module.exports=blog


