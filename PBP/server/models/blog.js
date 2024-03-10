const mongoose = require('mongoose');
require('dotenv').config();

const blogSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true,
        trim:true
    },

    publishedAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('blogSchema',blogSchema);