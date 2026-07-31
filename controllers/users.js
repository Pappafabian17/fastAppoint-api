const User = require("../models/User");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next)=>{
  try{
    const user = await User.findById(req.params.id);
    if (!user){
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json(user);
  }catch(error){
    next(error);
  }
}

const createUser = async (req, res, next) => {
  try{
    const {name , email, googleId, githubId, role} = req.body;
    const existingUser = await User.findOne({email});

    if(existingUser){
      const error = new Error('User already exists');
      error.statusCode = 400;
      throw error;
    }

    const user = await User.create({name , email, googleId, githubId, role});
    res.status(201).json(user);
    
  }catch(error){
    next(error);
  }
}

const updateUser = async (req, res, next) => {
  try {
    const {name, email, googleId, githubId, role} = req.body;

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, googleId, githubId, role },
      { new: true, runValidators: true }
    );
    if(!updateUser){
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json(updateUser);
  } catch (error) {
    next(error)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if(!deletedUser){
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({message:'User deleted successfully', deletedUser})
  } catch (error) {
    next(error);
  }
}

module.exports = { getAllUsers , getUserById, createUser, updateUser, deleteUser };