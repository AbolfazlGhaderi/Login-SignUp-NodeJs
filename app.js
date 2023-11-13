const express = require("express");
const app = express();

const bodyParser=require('body-parser');
const path =require('path');

const authRoute=require('./routes/auth');
//----------- Set Views ------------------

app.set("view engine", "ejs");
app.set("views", "views");

//----------- Middlewares ----------------

app.use(bodyParser.urlencoded({extended:false}))
app.use("/assets",express.static(path.join(__dirname,'public')))

//----------- Router ---------------------

app.use(authRoute)


app.listen(3000, console.log("App is Runing in port 3000 !"));
