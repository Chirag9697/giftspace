const mongoose=require('mongoose');
const User=require('./User');
const{Schema}=mongoose;
const Trackschema=new Schema({
    User:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    giftName:{
        type:String
    },
    TrackingId:{
        type:Number
    },
    ForWhom:{
        type:String
    },
    CompanyName:{
        type:String
    }
})
const Track=mongoose.model('Track',Trackschema);
module.exports=Track;