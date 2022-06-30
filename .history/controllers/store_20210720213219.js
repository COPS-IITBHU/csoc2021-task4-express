var Book=require("../models/book")
var BookCopy=require("../models/bookCopy")
var User=require("../models/user");
var Books=[]
var obj=require("../app");
var getAllBooks = (req, res) => {
    //TODO: access all books from the book model and render book list page
    Book.find()
    .then((arr)=>{
        Books=arr;
        res.render("book_list", { books: Books, title: "Books | Library" });   
    })
    .catch((err)=>{
        console.log(err);
        res.end();
    });
    // console.log(currentUser.username);
}
var idBook;
var getBook = (req, res) => {
   Book.findById(req.params.id,((err,res)=>{
       idBook=res;
       if(err)
       {
           console.log(err);
       };
       
   })).then(() => {
       res.render("book_detail",{book:idBook, title:"Book details"});
   })
//    res.render("book_detail",{book:"",title:""}); 
    //TODO: access the book with a given id and render book detail page
}

var getLoanedBooks = (req, res) => {

    //TODO: access the books loaned for this user and render loaned books page
}

var issueBook = (req, res) => {
    var id=req.body.bid;
    var title = "";
    Book.findById(id)
    .then((book) => {
        title=book.title;
        // BookCopy.findOne({status:true,book:title})
        // .then((result) => {
                BookCopy.updateOne({status:false,book:title},{
                    status:false,
                    borrow_data:new Date().toLocaleDateString(),
                    borrower:obj.userNAME
                },function(err,docs) {
                    if(err) {
                        console.log(err);
                        console.log("errbooks");
                        console.log(obj.userNAME);
                    }
                    else{
                        // console.log(docs);
                    }
                })
                .then(()=>{
                    console.log("Book");
                })
        
        // }).catch((err)=>{
        //     console.log(err);
        // })
        // BookCopy.find({status:true,book:title}, ((err,List) => {
        //     if(err) {
        //         console.log(err);
        //     }
        //     else{
        //         if(List!==[]) {
        //             async function updateBookCopy(){
        //                 await User.updateOne({status:false,borrow_data:new Date().toLocaleString(),borrower:userNAME}).catch((err) =>{
        //                         console.log(err);
        //                         console.log("error");
        //                 })
        //             }
        //             updateBookCopy();
        //             // console.log(currentUser.username);
        //             User.find({username:userNAME},((err,updateUser)=>{
        //                 if(err){
        //                     console.log(err);
        //                 }else{
        //                     updatedArr=updateUser.loaned_books+List[0];
        //                     async function updateUserfun(){
        //                         await updateUser.updateOne({loaned_books:updatedArr}); 
        //                     }
        //                     updateUserfun();
        //                 }
        //             }));
        //             res.render("../views/loaned_books.ejs",{books:updatedArr});
        //         }else{

        //         }
        //     }
        // }));
    })
    .catch((err) => {
        console.log(err);
    });
    // Book.findById(req.body.bid)
    // .then((book) =>{
    //    const newBookCopy=new BookCopy({
    //         book:book.title,
    //         status:(book.available_copies>0)?true:false,

    //    }); 
    // })
    // .catch((err) =>{
    //     console.log(err);
    // });
    // TODO: Extract necessary book details from request
    // return with appropriate status
    // Optionally redirect to page or display on same
}

var searchBooks = (req, res) => {
    if(req.body.title!=='' && req.body.author!==''&& req.body.genre!=='')
    {
        Book.find({title:req.body.title, author:req.body.author, genre:req.body.genre},(err,resPar)=>{
            if(err){
                console.log(err);
            }else{
                    res.render("book_list",{books:resPar, title:"Searched List"})
            }
        });
    }
    else if(req.body.title==='' && req.body.author!==''&& req.body.genre!=='')
    {
        Book.find({ author:req.body.author, genre:req.body.genre},(err,resPar)=>{
            if(err){
                console.log(err);
            }else{
                res.render("book_list",{books:resPar, title:"Searched List"})
            }
        });
    }
    else if(req.body.title!=='' && req.body.author===''&& req.body.genre!=='')
    {
        Book.find({title:req.body.title, genre:req.body.genre},(err,resPar)=>{
            if(err){
                console.log(err);
            }else{
                res.render("book_list",{books:resPar, title:"Searched List"})
            }
        });
    }
    else if(req.body.title!=='' && req.body.author!==''&& req.body.genre==='')
    {
        Book.find({title:req.body.title, author:req.body.author},(err,resPar)=>{
            if(err){
                console.log(err);
            }else{
                res.render("book_list",{books:resPar, title:"Searched List"})
            }
        });
    }
    else if(req.body.title==='' && req.body.author===''&& req.body.genre!=='')
    {
        Book.find({ genre:req.body.genre},(err,resPar)=>{
            if(err){
                console.log(err);
            }else{
                res.render("book_list",{books:resPar, title:"Searched List"})
            }
        });
    }
    else if(req.body.title==='' && req.body.author!==''&& req.body.genre==='')
    {
        Book.find({ author:req.body.author},(err,resPar)=>{
            if(err){
                console.log(err);
            }else{
                res.render("book_list",{books:resPar, title:"Searched List"})
            }
        });
    }
    else if(req.body.title!=='' && req.body.author===''&& req.body.genre==='')
    {
        Book.find({title:req.body.title},(err,resPar)=>{
            if(err){
                console.log(err);
            }else{
                res.render("book_list",{books:resPar, title:"Searched List"})
            }
        });
    }
    else{
        res.redirect("/books");
    }
    // TODO: extract search details
    // query book model on these details
    // render page with the above details
}

module.exports = {
    getAllBooks,
    getBook,
    getLoanedBooks,
    issueBook,
    searchBooks
}