const mongoose = require("mongoose");
// const User = require("./user.js")
const Schema = mongoose.Schema;
const objectId = Schema.ObjectId;
const postSchema = new Schema({
    title:{type:String, required:true},
    body:{type:String, required:true},
    image:{type:String, required:true},
    user: {type: objectId, ref:"User"}
})

const Post = mongoose.model("posts",postSchema);

module.exports = Post;