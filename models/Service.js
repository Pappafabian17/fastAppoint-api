const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    title:{
      type:String,
      required: [true, 'Title is required'],
      trim:true
    }, 
    description:{
      type:String,
      required: [true, 'Description is required'],
    }, 
    durationMinutes:{
      type:Number,
      required: [true, 'Duration in minutes is required'],
      min: [1, 'Duration must be at least 1 minute']
    }, 
    price:{
      type:Number,
      required: [true, 'Price is required'],
      min: [0 , 'Price cannot be negative']
    }, 
    category:{
      type:String,
      required: [true, 'Category is required'],
      trim:true
    }, 
    providerId:{
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Provider ID is required'],
      ref:'User'
    }    
  },
  {
    timestamps:true
  }
)

module.exports = mongoose.model('Service',serviceSchema)