const Schema = require("mongoose").Schema

const userSchema = new Schema({
    name:{type:String, required:true},
    email:{type:String, unique:true},
    password:{type:String, required:true}
})

const User = mongoose.model("User",userSchema);

module.exports = User;