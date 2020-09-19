const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/keys');
const mongoose = require('mongoose')
const User = require('../models/userModel');

module.exports = (req,res,next) => {
    const {authorization} = req.headers
    //authorization
    if(!authorization){
        return res.status(401).json({
            success:'fail',
            message:'You must be logged in'
        })
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,payload) => {
        //call back function
        if(err){
            return res.status(401).json({
                error:"You must be logged in"
            })
        }
        const {_id} = payload;
        User.findById(_id).then(userData => {
            req.user = userData //all user details
            next()
        })
        
    } )
}