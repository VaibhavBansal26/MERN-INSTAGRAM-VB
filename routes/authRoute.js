const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs') //#passwords
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const {SENDGRID_API,EMAIL} = require('../config/keys')

//Config Secret key
const {JWT_SECRET} = require('../config/keys');
//Defining router
const router = express.Router();

//Auth middleware
const reqLogin = require('../middleware/reqLogin')

//Routes
// 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
//protected route

const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:SENDGRID_API
    }
}))

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
                console.log(user.email);
                transporter.sendMail({
                    to:user.email,
                    from:"vaibhav.bansal2020@gmail.com",
                    subject:"Signed Up Successfully",
                    html:`<h1>Welcome to Insta-vb ${user.name} 🔥 🔥 🔥 </h1>`
                })
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

//reset password route

router.post('/reset-password',(req,res) => {
    crypto.randomBytes(32,(err,buffer) => {
        if(err){
            console.log(err);
        }
        //code in hexacode form
        const token = buffer.toString("hex")
        User.findOne({email:req.body.email})
        .then(user => {
            if(!user){
                return res.status(422).json({error:"User doesnt exist"})
            }
            user.resetToken = token;
            user.expireToken = Date.now() + 3600000
            user.save().then((result) =>{
                transporter.sendMail({
                    to:user.email,
                    from:"vaibhav.bansal2020@gmail.com",
                    subject:"password-reset",
                    html:`
                    <p>You requested for password reset</p>
                    <h5>Click here<a href="${EMAIL}/reset/${token}">link</a> to reset password</h5>
                    `
                })
                res.json({message:"Check your email for password reset"});
            })
        })
    })

})

router.post('/new-password',(req,res) => {
    const newPassword = req.body.password
    const sentToken = req.body.token
    User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user =>{
        if(!user){
            return res.status(422).json({error:"Try again session expired"})
        }
        bcrypt.hash(newPassword,12).then(hashedpassword =>{
            user.password = hashedpassword;
            user.resetToken= undefined;
            user.expireToken = undefined;
            user.save().then((savedUser)=>{
                res.json({message:"password updated successfully"})
            })
        })
    }).catch(err =>{
        console.log(err);
    })
})

module.exports = router;