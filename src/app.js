const express = require("express");
const loginRoute = require("./routes/login.js")
const postsRoute = require("./routes/posts.js")
const jwt = require("jsonwebtoken")
const secret = "FirstGitApp"
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use("/",loginRoute)
app.use("/posts",verification,postsRoute)
function verification(req,res,next){
    if(req.headers.authorization){
        const token = req.headers.authorization.split("test ")[1]
        jwt.verify(token, secret, function(err, decoded) {
            if(err){
                res.status(403).json({status:"Failed",message:err.message})
            }else{
                req.user = decoded.data
                next();
            }})
    }else{
        return res.status(403).json({staus:"Failed",message:"Token is missing"})
    }        
}

module.exports = app;