var mongoose=require("mongoose");
//DEFINING THE BOOK  COPIES MODEL
var bookCopySchema=new mongoose.Schema({
//TODO: DEFINE the following attributes-
 book:{
     type:String,
     required:true
 } //embed reference to id of book of which its a copy
 status:{
     type:Boolean,
     required:false
 } //TRUE IF AVAILABLE TO BE ISSUED, ELSE FALSE 
 borrow_data:{
     type
 } //date when book was borrowed
 borrower: //embed reference to id of user who has borrowed it 
})
module.exports=mongoose.model("Bookcopy",bookCopySchema);