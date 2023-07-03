const mongoose=require('mongoose');
const User=require('./User');
const{Schema}=mongoose;
const Giftschema=new Schema({
    User:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    giftName:{
        type:String
    },
    Price:{
        type:Number
    },
    ForWhom:{
        type:String
    },
    Url:{
        type:String
    }
})
const Gift=mongoose.model('Gift',Giftschema);
module.exports=Gift;