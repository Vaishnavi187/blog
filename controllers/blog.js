const  mongoose  = require("mongoose");
const blog = require("../model/blog");
const User = require("../model/user");

exports.getallblog = async (req, res) => {
  try {
    const blogs = await blog.find().populate('user');
    if (!blogs) {
      return res.status(400).send({
        msg: "No Blog Found",
        success: false,
      });
    }
    return res.status(200).send({
      BlogCount: blogs.length,
      success: true,
      msg: "Blog List",
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ msg: "Error while getting blogss", success: false, error });
  }
};

exports.createblog = async (req, res) => {
  try {
    const { title, description, image ,user} = req.body;
    if (!title || !description || !image || !user) {
      return res.status(400).send({
        success: false,
        msg: "Please Provide all fields",
      });
    }
    const exsistingUser=await User.findById(user);
    if(!exsistingUser){
      return res.status(404).send({
        success: false,
        msg: "unable to find user",
      });
    }
    const newblog = new blog({
      title,
      description,
      image,
      user
    });
    
    //session

    const session =await mongoose.startSession()
    session.startTransaction()
    await newblog.save({session})
    exsistingUser.blogs.push(newblog)
    await exsistingUser.save({session})
    await session.commitTransaction();

    await newblog.save();

    return res
      .status(200)
      .send({ msg: "Blog Created", success: true, newblog });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ msg: "Error while creating blogss", success: false, error });
  }
};

exports.updateblog = async (req, res) => {
  try {
    const { id } = req.params;
    // const {title,description,image}=req.body;
    const updateblog = await blog.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res
      .status(200)
      .send({ success: true, msg: "Blog Updated", updateblog });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ msg: "Error while updating blogss", success: false, error });
  }
};

exports.deleteblog = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteblog = await blog.findByIdAndDelete(id).populate("user")
    await deleteblog.user.blogs.pull(deleteblog)
    deleteblog.user.save()
    return res
      .status(200)
      .send({ message: "Post deleted successfully", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Error in Deleting Post", success: false, error });
  }
};

exports.byid = async (req, res) => {
  try {
    const { id } = req.params;
    const singleblog = await blog.findById(id);
    if (!singleblog) {
      return res.status(400).send({
        success: false,
        msg: "Blog not found with this id",
      });
    }
    return res.status(200).send({
      success: true,
      msg: "Blog by id is found",
      singleblog,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({
        msg: "Error while getting single blogss",
        success: false,
        error,
      });
  }
};
//For getting User Blog
exports.userblog=async(req,res)=>{
  try {
    const userBlog=await User.findById(req.params.id).populate("blogs")
    if(!userBlog){
      return res
      .status(404)
      .send({
        msg: "Blog Not found with this id",
        success: false,
      
      });
    }

    return res
    .status(200)
    .send({
      msg: "User Blogs",
      success: true,userBlog
  
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({msg:"Error in user Blog",success:false,error})
    
  }
}
