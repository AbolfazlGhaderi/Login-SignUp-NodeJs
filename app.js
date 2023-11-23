const express = require("express");
const app = express();

const bodyParser = require('body-parser');
const path = require('path');
const flash = require('connect-flash');
const cookiParser = require('cookie-parser');
const session = require('express-session');

const authRoute = require('./routes/auth');
const morgan = require('morgan');

const mongoose = require("mongoose")
//----------- Set Views ------------------

app.set("view engine", "ejs");
app.set("views", "views");

//----------- Middlewares ----------------
app.use(express.json())
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use("/assets", express.static(path.join(__dirname, 'public')))
//----------- flash ----------------------
app.use(cookiParser());
app.use(session({
  secret: 'something',
  cookie: { maxAge: 60000 },
  resave: true,
  saveUninitialized: true
}));
app.use(flash());

//----------- Router ---------------------

app.use(authRoute)

app.get('/', (req, res) => {

  const successAddProduct = req.flash("successAddProduct");

  res.render('./index.ejs', { successAddProduct })
})

mongoose.connect('mongodb://127.0.0.1:27017/login-signup-nodejs')
  .then(() => {
    console.log("connected to login-signup-nodejs DB ... ");
    app.listen(3000, console.log("App is Runing in port 3000 !"));
  })

