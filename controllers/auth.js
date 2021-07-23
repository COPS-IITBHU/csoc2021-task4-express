const mongoose = require("mongoose");
const URI = require("../config/uri").mongoURI;
const passport = require("passport");
const User = require("../models/user")

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log("Connection of store with MongoDB established..."))
  .catch(err => console.log(err));
    
var getLogin = (req, res) => {
  //TODO: render login page
  res.render("login", { title: "Login" });
};

var postLogin = (req, res) => {
  // TODO: authenticate using passport
  //On successful authentication, redirect to next page
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, (err) => {
    if (err) {
      console.log(err);
      res.redirect("/login");
    } else {
      res.redirect("/");
      passport.authenticate("local")(req, res, () => {
        res.redirect("/");
      })
    }
  })
};

var logout = (req, res) => {
  // TODO: write code to logout user and redirect back to the page
  req.logout();
  res.redirect("/login");
};

var getRegister = (req, res) => {
  // TODO: render register page
  res.render("register", { title: "Register" });
};

var postRegister = (req, res) => {
  // TODO: Register user to User db using passport
  //On successful authentication, redirect to next page
  const { username, password } = req.body;

  const user = new User({
    username: username,
    password: password
  });

  user.save((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("user", username, "registered");
      req.login(user, (err) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect("/");
          passport.authenticate("local")(req, res, () => {
            res.redirect("/");
          });
        }
      });
    }
  });
};

module.exports = {
  getLogin,
  postLogin,
  logout,
  getRegister,
  postRegister,
};
