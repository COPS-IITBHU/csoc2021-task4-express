var mongoose=require("mongoose");
//DEFINING THE BOOK MODEL
var bookSchema=new mongoose.Schema({
    Title:{
        type:String,
        required:true,
    },
    Author:{
        type:String,
        required:true,
    },
    Genre:{
        type:String,
        required:true,
    }, 
    Rating:{
        type:String,
        requireda:true,
    },
    description:{

    }
    //TODO: access all books from the book model and render book list page
    /*TODO: DEFINE the following attributes-
    title, genre, author, description, rating (out of 5), mrp, available_copies(instances).
     */
})
module.exports=mongoose.model("Book",bookSchema);