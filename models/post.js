const Schema = require("mongoose").Schema;
const postSchema = new Schema({
    title:{type:String, required:true},
    body:{type:String, unique:true},
    image:{type:String, required:true},
    user:{type:Schema.objectId, ref:"User"}
})

const post = mongoose.model("posts",postSchema);

module.exports = post;