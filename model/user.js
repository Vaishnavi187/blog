const {Schema,model, default: mongoose} = require('mongoose');

const userSchema= Schema({
    username:{
        type:String,
        require:[true,'Username is reqired'],
        trim:true,
    },
    email:{
        type:String,
        require:[true,'email is reqired'],
        unique:true,
        trim:true,
    },
   
    password:{
        type:String,
        require:[true,'password is reqired'],
    
    },
    blogs:[
        {
            type:mongoose.Types.ObjectId,
            ref:'Blog'
        }
    ]
})
const User=model("user",userSchema)

module.exports=User;