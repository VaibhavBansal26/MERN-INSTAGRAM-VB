const express = require('express');
const mongoose = require('mongoose');

const User = require('../models/userModel');
const Post = require('../models/postModel');

const reqLogin = require('../middleware/reqLogin');
const router = express.Router();


router.get('/profile/:id',reqLogin,(req,res) => {
    console.log(req.params.id);
    User.findOne({_id:req.params.id})
    .select("-password")
    .then(user => {
        Post.find({postedBy:req.params.id})
        .populate("postedBy","_id name")
        .exec((err,posts) => {
            if(err){
                return res.status(422).json({error:err})
            }
            res.status(200).json({user,posts})
        })
    }).catch(err => {
        return res.status(404).json({error:"User not found"})
    })
})


router.put('/follow',reqLogin,(req,res) => {
    User.findByIdAndUpdate(req.body.followId,{
        $push:{followers:req.user._id}
    },{
        new:true
    },(err,result) => {
        if(err) {
            return res.status(422).json({error:err})
        }
        User.findByIdAndUpdate(req.user._id,{
            $push:{following:req.body.followId}
        },{
            new:true
        }).select("-password").then(result =>{
            res.status(200).json(result)
        }).catch(err =>{
            return res.status(422).json({error:err})
        })
    })
})

router.put('/unfollow',reqLogin,(req,res) => {
    User.findByIdAndUpdate(req.body.unfollowId,{
        $pull:{followers:req.user._id}
    },{
        new:true
    },(err,result) => {
        if(err) {
            return res.status(422).json({error:err})
        }
        User.findByIdAndUpdate(req.user._id,{
            $pull:{following:req.body.unfollowId}
        },{
            new:true
        }).select("-password").then(result =>{
            res.status(200).json(result)
        }).catch(err =>{
            return res.status(422).json({error:err})
        })
    })
});


router.put('/updatePhoto',reqLogin,(req,res) => {
    User.findByIdAndUpdate(req.user._id,{
        $set:{photo:req.body.photo
    }},{
        new:true
    },(err,result) =>{
        if(err){
            return res.status(422).json({error:"not uploaded"})
        }
        res.status(200).json(result)
    })
})

router.post('/search-users',(req,res) => {
    let userPattern = new RegExp("^"+req.body.query)
    User.find({email:{$regex:userPattern}}).select("_id email name photo")
    .then(user =>{
        res.json({user})
    }).catch(err =>{
        console.log(err)
    })
})






module.exports = router;