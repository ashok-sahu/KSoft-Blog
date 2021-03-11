const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    }
});

const Posts = mongoose.model("Posts", PostSchema);
module.exports = Posts;
