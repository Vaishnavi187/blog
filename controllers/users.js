
const User = require("../model/user");
const bcryptjs = require('bcryptjs');

const getalluser=async(req,res)=>{
   try {
    const users=await User.find()
    return res.status(200)
    .send({userCount:users.length, msg: "All user Data", success: true ,users });
   } catch (error) {
    console.log(error);
    return res.status(500)
    .send({ msg: "Error in getting all user", success: false, error });
   }
}

const registerusers=async(req,res)=>{
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).send({ msg: "Fill all fields", success: false });
    }
    const exsistinguser = await User.findOne({ email });
    if (exsistinguser) {
      return res
        .status(401)
        .send({ msg: "User already exsist", success: false});
    }
    const hashedpassword=await bcryptjs.hash(password,10)
   // save new user
    const user = await User.create({ username, email, password:hashedpassword });
    await user.save();
    return res
      .status(201)
      .send({ msg: "New user Created", success: true, user});
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ msg: "error in registering user", success: false, error });
  }

}

const loginuser=async(req,res)=>{
 try {
  const {email,password}=req.body
  if(!email ||!password){
    return res.status(400).send({msg:"Please provide email and password",success:false})
  }
  const user=await User.findOne({email})
  if(!user){
    return res.status(400).send({msg:"email is not registered",success:false})
  }

  const isMatch=await bcryptjs.compare(password,user.password)
  if(!isMatch){
    return res.status(401).send({msg:"Invalid username or password"})
  }
  return res.status(200).send({msg:"Loggedin successfully",success:true,user})
 } catch (error) {
  return res.status(500)
  .send({ msg: "Error in Login", success: false, error });
 }

}

module.exports={registerusers,getalluser,loginuser}