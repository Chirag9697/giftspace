const express=require('express');
const app=express();
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const cors=require('cors');
const User=require('./mongoosemodels/User.js');
const{createToken,verifyToken}=require('./authentication/auth');
const { MongoClient, ServerApiVersion } = require('mongodb');
// const multer=require('multer');
// const upload = multer({ dest: "uploads/" });
const uri = "mongodb+srv://chirag:nepal@nodeexpressprojects.qyynx.mongodb.net/?retryWrites=true&w=majority";
const dbName = "store";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
const db = client.db(dbName);
async function run() {
    await client.connect();
}
run().then(e=>console.log("connected to db")).catch(console.dir);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send("hello world");    
})

app.post('/addsellitem',verifyToken,async(req,res)=>{
    const{Name,Description,phoneno}=req.body;
    // console.log(filename);
    res.send("heelo");
})

app.get('/getsellitems',verifyToken,async(req,res)=>{
    const col=db.collection("Item");
    const allitems=await col.findall({User:req.user});
    res.send(allitems);
})

app.delete('/deletesellitem/:id',verifyToken,async(req,res)=>{
    const{id}=req.params;
    const col=db.collection("Items");
    const del=await col.findByIdAndDelete(id);
    if(del){
        return res.send({success:"successfully deleted"})
    }
    return res.status(400).send({msg:"error"});
})

app.post('/login',async(req,res)=>{
    const{Username,password}=req.body;
    const col=db.collection("User");   
    const founduser=await col.findOne({Username:Username});
    if(founduser){
        const hash=founduser.password;  
        const found=await bcrypt.compare(password,hash);
        if(found){
            const accessToken=createToken(founduser);
            res.json({token:accessToken});
        }
        else{        
            res.status(400).json({error:"password didnt match"});
        }
    }
    else{
        res.status(400).json({error:"email doesn't exist"});
    }
})

app.post('/register',async(req,res)=>{
    const{Name,username,password}=req.body;
    console.log(req.body);
    const col=db.collection("User");
    const hash=await bcrypt.hash(password, 10);
    if(hash){
        const finddupuser=await col.findOne({username:username});
        if(finddupuser){
            return res.status(400).send({error:"there is some error"});
        }
        const saved=await col.insertOne({username:username,password:hash,Name:Name});
        // const saved=await newUser.save();
        console.log(saved);
        if(saved){
            return res.send({success:"successfully registered"});
        }
        else{
           return res.status(400).send({error:"user not registered"});
        }
    }
    else{

        return res.status(400).send({error:"there is some error"});
    }
})


app.listen(3000,()=>{
    console.log("app is listening on port 3000");
})