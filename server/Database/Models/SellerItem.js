const mongoose=require('mongoose');

const SellerItemSchema=new mongoose.Schema({
    dishName:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    ingredients:{
        type:String,
        
    },
    portionSize:{
        type:String,
        required:true
    },
    customization:{
        type:String,
        
    },
    dietaryInfo:{
        type:String,
        
    },
    sellerEmail:{
        type:String,
        required:true
    }
});

const SellerItem=mongoose.model('SellerItem',SellerItemSchema);
module.exports=SellerItem;