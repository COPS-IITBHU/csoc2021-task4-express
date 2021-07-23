var mongoose=require("mongoose");
var	passportLocal=require("passport-local-mongoose");
//DEFINING THE USER MODEL
var userSchema=new mongoose.Schema({

	//TODO: DEFINE USERNAME AND PASSSWORD ATTRIBUTES
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    loaned_books: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bookcopy"
        }
    ]//TODO: embed reference to id's of book copies loaned by this particular user in this array
})
userSchema.plugin(passportLocal);
module.exports=mongoose.model("User",userSchema);