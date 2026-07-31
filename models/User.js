const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email:{
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true, 
    trim: true,
  },
  googleId:{
    type: String,
    default:null
  },
  githubId:{
    type: String,
    default: null
  },
  role:{
    type: String,
    enum: ['client', 'provider', 'admin'],
    default: 'client'
  }
},
{
    timestamps:true
  });


  module.exports = mongoose.model('User', userSchema);