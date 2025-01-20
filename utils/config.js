const mongoose = require('mongoose');

const URL=process.env.URI;

const connection=async()=>{
    try {
       await mongoose.connect(URL) 
    } catch (error) {
        console.log(error);
        process.exit(1);
        
    }
}
module.exports=connection;

