const express= require('express');
const Buyer=require('../Database/Models/buyers');
const bcrypt = require('bcrypt');
const router=express.Router();

router.post('/',async(req,res)=>{
    try{
        const{fullName,userName,email,contactNo,password,address}=req.body;

        const saltRounds=10;
        const hashedPasswords=await bcrypt.hash(password,saltRounds);

        const buyer= new Buyer({fullName,userName,email,contactNo,password:hashedPasswords,address});
        await buyer.save();
        res.status(200).json({
            status:'success',
            data:{
                buyer
            }
            
        })
    }catch(err){
        let errorMessage;
        if (err.code === 11000) {
            // Handle duplicate key error
            errorMessage = 'Email already exists';
        }else {
            // Generic error message
            errorMessage = err.message;
        }

        // Send a failed response
        res.status(500).json({
            status: 'failed',
            message: errorMessage
        });
    }
})

module.exports=router;