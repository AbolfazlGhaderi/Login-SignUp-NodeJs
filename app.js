const express = require("express");
const app = express();

const bodyParser=require('body-parser');
const path =require('path');
const flash = require('connect-flash');
const cookiParser = require('cookie-parser');
const session = require('express-session');

const authRoute=require('./routes/auth');
//----------- Set Views ------------------

app.set("view engine", "ejs");
app.set("views", "views");

//----------- Middlewares ----------------

app.use(bodyParser.urlencoded({extended:false}))
app.use("/assets",express.static(path.join(__dirname,'public')))
//----------- flash ----------------------
app.use(cookiParser());
app.use(session({
    secret : 'something',
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true
  }));
app.use(flash());

//----------- Router ---------------------

app.use(authRoute)

app.get('/',(req,res)=>{
   
    const successAddProduct = req.flash("successAddProduct");

    res.render('./index.ejs',{successAddProduct})
})

app.listen(3000, console.log("App is Runing in port 3000 !"));
