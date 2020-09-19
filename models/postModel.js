const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true       
    },
    likes:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }],
    comments:[{
        text:String,
        postedBy:{
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    }
    ],
    postedBy:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true})

const Post = mongoose.model("Post",postSchema);

module.exports = Post;