const express = require("express");
const loginRoute = require("./routes/login.js")

const app = express();
app.use(express.json());
app.use("/",loginRoute)
app.use("/posts",postsRoute)


module.exports = app;