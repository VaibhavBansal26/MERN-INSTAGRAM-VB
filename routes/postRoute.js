const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const Post = require('../models/postModel');

const reqLogin = require('../middleware/reqLogin');
//const { populate } = require('../models/userModel');

//Defining router
const router = express.Router();

//1.Create post route
router.post('/createpost',reqLogin,(req,res) => {
    console.log(req);
    const {title,body,pic} = req.body;
    if(!title || !body || !pic){
        return res.status(422).json({error:"Please add all the fields"})
    }
    req.user.password = undefined
    const post = new Post({
        title,
        body,
        photo:pic,
        postedBy:req.user
    })
    post.save().then(result => {
        res.json({post:result})
    }).catch(err => {
        console.log(err);
    })
})

//2.Get all posts
router.get('/allpost',reqLogin,(req,res) => {
    Post.find().populate("postedBy","_id name photo").populate("comments.postedBy","_id name photo").sort("-createdAt")
    .then(posts => {
        res.status(200).json({posts})
    }).catch(err => {
        console.log(err);
    })
})

//3.Get all post by user
router.get('/mypost',reqLogin,(req,res) => {
    Post.find({"postedBy":req.user._id})
    .populate("postedBy","_id name photo").sort("-createdAt")
    .then(myPost => {
        res.json({myPost})
    }).catch(err =>{
        console.log(err);
    })
})

//4.Like
router.put('/like',reqLogin,(req,res) => {
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).populate("postedBy","_id name photo").exec((err,result) =>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.status(200).json(result);
        }
    })
})

//5.dislike
router.put('/unlike',reqLogin,(req,res) => {
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).populate("postedBy","_id name photo").exec((err,result) =>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.status(200).json(result);
        }
    })
})

//6. Comment
router.put('/comment',reqLogin,(req,res) => {
    const comment = {
        text:req.body.text,
        postedBy:req.user
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    }).populate("comments.postedBy","_id name photo").populate("postedBy","_id name photo").exec((err,result) =>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.status(200).json(result);
        }
    })
})

//7.delete
router.delete('/deletePost/:postId',reqLogin,(req,res) => {
    Post.findOne({_id:req.params.postId}).populate("postedBy","_id name photo")
    .exec((err,post) => {
        if(err|| !post){
            return res.status(422).json({error:err});
        }
        if(post.postedBy._id.toString() === req.user._id.toString()){
            post.remove().then(result => {
                res.status(200).json(result)
            }).catch(err =>{
                console.log(err)
            })
        }
    })
})

//8.delete Comment
router.delete('/deleteComment/:postId/:commentId',reqLogin,(req,res) => {
    const p = req.params.postId;
    const q = req.params.commentId;
    Post.findByIdAndUpdate(req.params.postId,{
        $pull:{comments:{_id:req.params.commentId}}
    },{
        new:true
    }).populate("comments.postedBy","_id name photo").populate("postedBy","_id name photo")
    .exec((err,post) => {
        if(err || !post){
            return res.status(422).json({error:err})
        }
        else{
            console.log(post);
            res.status(200).json(post);
        }
    })
})


router.get('/getsubpost',reqLogin,(req,res) => {
    Post.find({postedBy:{$in:req.user.following}}).populate("postedBy","_id name photo").populate("comments.postedBy","_id name photo").sort("-createdAt")
    .then(posts => {
        res.status(200).json({posts})
    }).catch(err => {
        console.log(err);
    })
})

module.exports = router;