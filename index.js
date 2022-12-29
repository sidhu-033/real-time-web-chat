var express=require("express");
var mongoose=require("mongoose");
var multer=require("multer");
var jwt=require("jsonwebtoken");
var http = require('http');
let cookie=require("cookie-parser");

var userModel=require("./models/schema");
const cors=require("cors")
var app=express();
const { Server } = require('socket.io');
// const cookieParser = require("cookie-parser");
// const io=require('socket.io')(http)

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
// app.use(cookieParser());
const server = http.createServer(app);

mongoose
 .connect("mongodb+srv://daman:destiny5855@cluster0.dzfmnhq.mongodb.net/test")
 .then(()=>console.log("db connected..."))
 .catch((err)=>console.log("db not connected"+err));

app.post("/register", async (req,res)=>{
    
    let result = await userModel.findOne({email:req.body.email});
    if(!result){
        // const {fname,lname,contact,email,password}=req.body;
        console.log(req.body)
        let data=await userModel.create({
                    fname:req.body.name,
                    lname:req.body.lastname,
                    contact:req.body.contact,
                    email:req.body.email,
                    password:req.body.password
                 });
    res.send(data);

    }else{
        res.send(JSON.stringify("The given email address already exists!"))
    }
});
app.post("/login", async(req,res,next)=>{
    let { email, password } = req.body;
    console.log(email)
    var existinguser; 
    try{
        existinguser= await userModel.findOne({email:email});
    }
    catch {
        const error=new Error("Error! Something went wrong...");
        return next(error);
    }
    // console.log(existinguser)
    if(!existinguser || existinguser.password!=password) {
        console.log(password)
        const error=new Error("Oops! You have entered a wrong password");
        return next(error);
    }
    let token;
    try {
        token=jwt.sign(
            {userId:existinguser._id,
             email:existinguser.email,
             fname:existinguser.fname,
             lname:existinguser.lname,
             contact:existinguser.contact
            },
            "What's up Daman? Howdy kid....Keep going...You are doing great...",
            {expiresIn:"1h"}
        );
    }
    catch(err){
        console.log(err);
        const error=new Error("Oops! Something went wrong...")
        return next(error)
    }
    res
    .status(200)
    .json({
        success:true,
        data:{
            userId:existinguser._id,
            email:existinguser.email,
            name:existinguser.fname,
            token:token
        },
    });
})
app.get("/getdata/:token", (req,res)=>{
    console.log(req.params['token']);
    const token=req.params['token'];
    const decodedtoken=jwt.verify(token,"What's up Daman? Howdy kid....Keep going...You are doing great...");
    console.log(decodedtoken);
    res.send(decodedtoken);
})
const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });
// const io = require('socket.io')(http)
io.on('connection',(socket)=>{
    console.log("connected...")
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message', msg)
    })
})






server.listen(5000, () => {
    console.log(`Listening on port 5000`)
})
// app.listen(5000,()=>console.log("server started....."))