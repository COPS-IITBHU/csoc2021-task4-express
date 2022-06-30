const express = require("express");
const app = express();
var mongoose = require("mongoose");
var passport = require("passport");
var auth = require("./controllers/auth");
var store = require("./controllers/store");
var User = require("./models/user");
var {Book,bookSchema}=require("./models/book.js")
var BookCopy=require("./models/bookCopy.js");
var LocalStrategy = require("passport-local").Strategy;
var userNAME="";
//importing the middleware object to use its functions
var middleware = require("./middleware"); //no need of writing index.js as directory always calls index.js by default
var port = process.env.PORT || 3000;

app.use(express.static("public"));

/*  CONFIGURE WITH PASSPORT */
app.use(
  require("express-session")({
    secret: "decryptionkey", //This is the secret used to sign the session ID cookie.
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize()); //middleware that initialises Passport.
app.use(passport.session());
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username ,password:password}, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
//used to authenticate User model with passport
passport.serializeUser(User.serializeUser()); //used to serialize the user for the session
passport.deserializeUser(User.deserializeUser()); // used to deserialize the user
// const user=new DefaultUser({username:'user'});
// await user.setPassword
app.use(express.urlencoded({ extended: true })); //parses incoming url encoded data from forms to json objects
app.set("view engine", "ejs");

//THIS MIDDLEWARE ALLOWS US TO ACCESS THE LOGGED IN USER AS currentUser in all views
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

/* TODO: CONNECT MONGOOSE WITH OUR MONGO DB  */

app.get("/", (req, res) => {
  res.render("index", { title: "Library" });
});

/*-----------------Store ROUTES
TODO: Your task is to complete below controllers in controllers/store.js
If you need to add any new route add it here and define its controller
controllers folder.
*/
mongoose.connect('mongodb+srv://rit:mongo123@cluster0.4nsv4.mongodb.net/library?retryWrites=true&w=majority',{ useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true })
// app.get("/addbooks",()=>{
//   const book1=new Book({
//     title:"book2",
//     genre:"k-pop",
//     author:"bts",
//     description:"0.3billion sales",
//     rating:3.5,
//     mrp:44,
//     available_copies:5
//     /*TODO: DEFINE the following attributes-
//     title, genre, author, description, rating (out of 5), mrp, available_copies(instances).
//      */
//   });
//     book1.save()
//     .then((result)=>{
//       console.log(result);
//     })
//     .catch((err)=>{
//       console.log(err);
//     })
// })
app.get("/books", store.getAllBooks);

app.get("/book/:id", store.getBook);
app.post("/delete",(req,res)=>{
  Book.findOne({title:req.body.title,genre:req.body.genre,author:req.body.author},function(err,foundBook){
    if(err){
      console.log(err);
    }else{
      var updateAvailableCopies;
      BookCopy.findOne({borrower:req.user.username,"book.title":req.body.title},function(err,foundBookCopy){
          if(err){
            console.log(err);
          }
          else{
              var updateUserArr;
              User.findOne({username:req.user.username},function(err,foundUser){
                  if(err){
                    console.log(err);
                    console.log("hi");
                  }
                  else{
                    console.log('hilsa');
                    updateUserArr=foundUser.loaned_books;
                    updateUserArr=updateUserArr.filter(cpy => (cpy._id).toString()!==(foundBookCopy._id).toString());
                    // console.log(updateUserArr[0]._id!==foundBookCopy._id);
                    // console.log(updateUserArr[1]._id!==foundBookCopy._id);
                    // console.log(updateUserArr);
                    // console.log(typeof(foundBookCopy._id));
                    // console.log(typeof(updateUserArr[0]._id));
                    User.updateOne(foundUser,{
                      loaned_books:updateUserArr,
                    },function(err,docs){
                      if(err){
                        console.log(err);
                      }else{
                        console.log("hijfsl");
                        updateAvailableCopies=foundBookCopy.available_copies;
                        updateAvailableCopies+=1;
                        BookCopy.updateOne(foundBookCopy,{
                        available_copies:updateAvailableCopies,
              },function(err,docs){
                if(err){
                  console.log(err);
                }
                else{
                  console.log("jer");
                }
              });
              res.render("loaned_books.ejs",{books:updateUserArr,title:"loaned books"});
                      }
                    });
                  }

              });
          }
      });
    }
  });
});
app.get("/books/loaned",
//TODO: call a function from middleware object to check if logged in (use the middleware object imported)
 store.getLoanedBooks);

app.post("/books/issue", 
//TODO: call a function from middleware object to check if logged in (use the middleware object imported)
store.issueBook);
// app.get("/issueBooks",(req,res) => {
//            Book.findOne({title:"book1"},function(err, issuedBook) {
//              if(err) {
//                console.log(err);
//              }
//              else{
//                   const newBookCopy=new BookCopy({
//                     book:issuedBook,
//                     status:true,
//                     borrow_data:"",
//                     borrower:"",
//                     });
//                   newBookCopy.save()
//                   .then((res) =>{
//                     // console.log(res);
//                   })
//                   .catch((err) =>{
//                       console.log(err);
//                       console.log("hi");
//                   });
//              }
//            });
//          }

//     )

app.post("/books/search-book", store.searchBooks);

/* TODO: WRITE VIEW TO RETURN AN ISSUED BOOK YOURSELF */

/*-----------------AUTH ROUTES
TODO: Your task is to complete below controllers in controllers/auth.js
If you need to add any new route add it here and define its controller
controllers folder.
*/

app.get("/login", auth.getLogin);

app.post("/login",passport.authenticate('local', { failureRedirect: '/login' }), auth.postLogin);

app.get("/register", auth.getRegister);

app.post("/register", auth.postRegister);

app.get("/logout", auth.logout);
// app.get("/addUsers",()=>{
//   console.log("hello");
//   const user2=new User({
//       username:"pg",
//       password:"pg123"
//     });
//     user2.save()
//     .then((result)=>{
//         console.log(result);
//     })
//     .catch((err)=>{
//       console.log(err); 
//     })
//   ;
// });
app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
// module.exports={userNAME};