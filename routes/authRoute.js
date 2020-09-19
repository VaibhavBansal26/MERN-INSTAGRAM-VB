const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs') //#passwords
const jwt = require('jsonwebtoken');

//Config Secret key
const {JWT_SECRET} = require('../config/keys');
//Defining router
const router = express.Router();

//Auth middleware
const reqLogin = require('../middleware/reqLogin')

//Routes

//protected route

//sign up route
router.post('/signup',(req,res) => {
    console.log(req.body.name)
    const{name,email,password,confirmPassword,photo} = req.body;
    if(!email || !password || !name ){
        return res.status(400).json({error:"Please fill all the details"});
    }
    User.findOne({email:email})
    .then((savedUser) => {
        if(savedUser){
            res.status(400).json({error:'User already exists with that email'})
        }
        
        bcrypt.hash(password,12).then(hashedpassword => {
            const user = new User({
                email,password:hashedpassword,name,photo
            })
            user.save().then(user => {
                res.status(200).json({message:"saved successfully"})
            }).catch(err => {
                console.log(err)
            })
        })
        
        
    }).catch(err => {
        console.log(err);
    })
    //res.status(200).json({message:'success'})
})


//sign in route
router.post('/signin',(req,res) => {
    const {email,password} = req.body;

    if(!email || !password) {
        return res.status(422).json({error:"Please provide the details"})
    }
    User.findOne({email:email})
    .then(savedUser => {
        if(!savedUser){
            return res.status(400).json({error:"Invalid credentials"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch => {
            if(doMatch){
                //res.status(200).json({message:"successfully signed in"})
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                const{_id,name,email,followers,following,photo} = savedUser;
                res.status(200).json({token,user:{_id,name,email,followers,following,photo}})
            }else{
                return res.status(422).json({error:"Invalid email or password"})
            }
        }).catch(err =>{
            console.log(err);
        })

    })
})

module.exports = router;