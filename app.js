const express = require("express");
const app = express();
const path = require('path');
const flash = require('connect-flash');
const cookiParser = require('cookie-parser');
const session = require('express-session');
const authRoute = require('./routes/auth');
const mongoose = require("mongoose")
//----------- Set Views ------------------

app.set("view engine", "ejs");
app.set("views", "views");

//----------- Middlewares ----------------
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/assets", express.static(path.join(__dirname, 'public')))

//----------- flash ----------------------
app.use(cookiParser());
app.use(session({
  secret: 'this is just for testing',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());

//----------- Router ---------------------

app.use(authRoute)


mongoose.connect('mongodb://127.0.0.1:27017/login-signup-nodejs')
  .then(() => {
    console.log("connected to login-signup-nodejs DB ... ");
    app.listen(3001, console.log("App is Runing on port 3001 !"));
  })

