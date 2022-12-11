const router = require("express").Router();
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const secret = "FirstGitApp"
const bcrypt = require("bcrypt")
const {body, validationResult} = require("express-validator")
router.post("/register",body('email').isEmail(),body('name').isAlpha(),body('password').isLength({min:6,max:16}),async (req,res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        const result = await User.findOne({email:req.body.email})
        if(result){
            return res.status(400).json({status:"Failed", message:"User already exists with the given email"})
        }else{
            bcrypt.hash(req.body.password,10,async (err, hash)=>{
                if(err){
                    return res.status(500).json({
                        status:"Failed",
                        message:err.message
                    })
                }const user = await User.create({...req.body,password:hash})
                res.json({status:"Success",user})
            })   
        }
    }catch(e){
        res.status(400).json({status:"Failed",message:e.message})
    }
    
})
router.post("/login",body('email').isEmail(),body('password').isLength({min:6,max:16}),async (req,res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        const user = await User.findOne({email:req.body.email})
        if(!user){
            return res.status(409).json({status:"Failed",message:"There is no account with the given email"})
        }
        bcrypt.compare(req.body.password,user.password,(err,result)=>{
            if(err){
                return res.status(500).json({
                    status:"Failed",
                    message:err.message
                })
            }
            if(result){
                const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: user._id
                  }, secret);
                return res.json({status:"success",token})
            }else{
                res.status(401).json({message:"invalid credentials"})
            }
        })
    }catch(e){
        res.status(400).json(e.message)
    }
    
})
router.get("/user",async (req,res)=>{
    try{
        const users = await User.find();
        res.json(users)
    }catch(e){
        res.status(400).json({status:"Failed",message:e.message})
    }
})

module.exports = router;