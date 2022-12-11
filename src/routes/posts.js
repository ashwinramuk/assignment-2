const router = require("express").Router();
const posts = require("../models/post.js")

router.post("/",async (req,res)=>{
    try{
        const data = await posts.create({...req.body, user:req.user})
        res.json({status:"Post created",data})
        
    }catch(e){
        res.status(400).json({
            status:"Failed",
            message:e.message
        })
    }
})
router.get("/",async (req,res)=>{
    try{
        const data = await posts.find({})
        console.log(posts)
        res.json({status:"success",posts:data})
        
    }catch(e){
        res.status(400).json({
            status:"Failed",
            message:e.message
        })
    }
})
router.put("/:id",async (req,res)=>{
    try{
        const data = await posts.findOneAndUpdateOne({_id:req.params.id,user:req.user},req.body)
        if(data){
            res.json({status:"success",data})
        }else{
            const result = await posts.findOne({_id:req.params.id})
            if(result){
                res.status(403).json({status:"Failed",message:"Forbidden Access"})
            }else{
                res.status(400).json({status:"Failed",message:"given post id not found"})
            }    
        } 
        
    }catch(e){
        res.status(400).json({
            status:"Failed",
            message:e.message
        })
    }
})
router.delete("/:id",async (req,res)=>{
    try{
        const data = await posts.findOneAndDelete({_id:req.params.id,user:req.user})
        console.log(data)
        if(data){
            res.json({status:"successfully deleted"})
        }else{
            const result = await posts.findOne({_id:req.params.id})
            if(result){
                res.status(403).json({status:"Failed",message:"Forbidden Access"})
            }else{
                res.status(400).json({status:"Failed",message:"given post id not found"})
            }    
        }    
    }catch(e){
        res.status(400).json({
            status:"Failed",
            message:e.message
        })
    }
})

module.exports = router;