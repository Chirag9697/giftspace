const mongoose=require('mongoose');
const{Schema}=mongoose;
const Userschema=new Schema({
    Username:{
        type:String
    },
    password:{
        type:String
    }
})
const User=mongoose.model('User',Userschema);
module.exports=User;