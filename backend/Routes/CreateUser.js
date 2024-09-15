const express = require('express')
const router = express.Router()
const User=require('../models/User')
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwtSecret = "9uTMuJiAXxeUfk02TAryRNgWyMCqO1WA"

router.post("/createuser",[
    body('email','Incorrect Email').isEmail(),
    body('name').optional().isLength({ min: 5 }),
    body('password','Incorrect Password').optional().isLength({ min: 5 })
],async(req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()})
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password,salt);

    try {
       await User.create({
            name:req.body.name,
            password:secPassword,
            email:req.body.email,
            location:req.body.location
        })
        res.json({success:true});
    } catch (error) {
        console.log(error);
        res.json({success:false})
    }
})

router.post("/loginuser",[
    body('email','Incorrect Email').isEmail(),
    body('password','Incorrect Password').optional().isLength({ min: 5 })
],async(req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()})
    }
    let email = req.body.email;
    try {
       let userData = await User.findOne({email});
       if(!userData){
            return res.status(400).json({error:"Try login with correct Email"})
       } 
       const pwtCompare = await bcrypt.compare(req.body.password,userData.password)
       if(!pwtCompare){
            return res.status(400).json({error:"Try login with correct password"})
       }
       const data = {
            user:{
                id:userData.id
            }
       }
       const authToken = jwt.sign(data,jwtSecret)
       return res.json({success:true,authToken:authToken});
    } catch (error) {
        console.log(error);
        res.json({success:false})
    }
})
module.exports = router;