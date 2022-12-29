var mongoose=require("mongoose");
let model=new mongoose.Schema({
    fname:String,
    lname:String,
    contact:String,
    email:String,
    password:String
})
var userModel=mongoose.model("pcdata",model,"pcdata");
module.exports=userModel;
