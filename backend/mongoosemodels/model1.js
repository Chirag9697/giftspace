const mongoose=require('mongoose');
const{Schema}=mongoose;
const loginschema=new Schema({
    username:{
        type:String
    },
    password:{
        type:String
    }
})
const Login=mongoose.model('Login',loginschema);
module.exports=Login;