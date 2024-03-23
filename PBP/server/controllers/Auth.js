const User = require('../models/user');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.register = async(req,res) => {
    try{
        const{name,email,password} = req.body;

        if(!name || !email || !password)
        {
            return res.status(401).json({
                success:false,
                message:'All the details are required'
            })
        }
    
        const existingUser = await User.findOne({email:email});
        if(existingUser)
        {
            return res.status(403).json({
                success:false,
                message:'User already registered'
            })
        }
    
        let hashed = await bcrypt.hash(password,10);
    
        const newUser = await User.create({name:name,email:email,password:hashed});
    
        res.status(200).json({
            success:true,
            data:newUser,
            message:'User registered successfully'
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.login = async(req,res) => {
    try{
        const{email,password} = req.body;
        if(!email || !password)
        {
            return res.status(401).json({
                success:false,
                message:'All the details are required'
            })
        }

        let user = await User.findOne({email:email});
        if(!user)
        {
            return res.status(403).json({
                success:false,
                message:'User not registered'
            })
        }

        if(await bcrypt.compare(password,user.password))
        {
            let payload = {
                id:user._id,
                email:user.email
            }

            let token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:'120s'
            });

            user = user.toObject();
            user.token = token;
            
            res.status(200).json({
                success:true,
                token,user,
                message:'Login successful'
            })
        }
    }catch(error){
            res.status(500).json({
                success:false,
                message:error.message
            })
    } 
}