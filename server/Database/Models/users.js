const mongoose=require('mongoose');

const BuyerSchema= new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    contactNo:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:'buyer'
    },
    sellingType:{
        type:String,
        required:true,
    },
    brandName:{
        type:String,
        required:true
    }

});

const Buyer = mongoose.models.Buyer || mongoose.model('Buyer', BuyerSchema);

module.exports=Buyer;
