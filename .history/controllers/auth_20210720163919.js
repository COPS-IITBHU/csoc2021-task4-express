var passport = require("passport");
var User=require("../models/user.js")
var getLogin = (req, res) => {
  //TODO: render login page
  res.render("../views/login.ejs")
};

var postLogin = (req, res) => {
  res.re('../views/loaned_books.ejs')
  // TODO: authenticate using passport
  //On successful authentication, redirect to next page
};

var logout = (req, res) => {
  // TODO: write code to logout user and redirect back to the page
};

var getRegister = (req, res) => {
  // TODO: render register page
  res.render("../views/register.ejs");
};

var postRegister = (req, res) => {

  // TODO: Register user to User db using passport
  //On successful authentication, redirect to next page
};

module.exports = {
  getLogin,
  postLogin,
  logout,
  getRegister,
  postRegister,
};
