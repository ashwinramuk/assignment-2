const Schema = require("mongoose").Schema;
const postSchema = new Schema({
    title:{type:String, required:true},
    body:{type:String, required:true},
    image:{type:String, required:true},
    user:{type:Schema.objectId, ref:"User"}
})

const Post = mongoose.model("posts",postSchema);

module.exports = Post;