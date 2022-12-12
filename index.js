const mongoose = require("mongoose")
const app = require("./src/app")

mongoose.connect("mongodb://localhost/assignment",()=>{console.log("assignment Database is connected")})

app.listen(3000,()=>{console.log("server is running");})