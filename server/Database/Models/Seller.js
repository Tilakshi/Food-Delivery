const mongoose=require('mongoose');

const SellerSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    brandName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    contactNo:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    sellingType:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        default:'seller'
    }
});

const Seller=mongoose.model('Seller',SellerSchema);
module.exports=Seller;