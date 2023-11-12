const express = require("express");
const app = express();

const bodyParser=require('body-parser');
const path =require('path');

//----------- Set Views ------------------

app.set("view engine", "ejs");
app.set("views", "views");

//----------- Middlewares ----------------

app.use(bodyParser.urlencoded({extended:false}))
app.use("/assets",express.static(path.join(__dirname,'public')))

//-----------------


app.get("/", (req, res) => {
  res.render('./login.ejs')
});
app.get("/signup", (req, res) => {
    res.render('./Singup.ejs')
  });

app.listen(3000, console.log("App is Runing in port 3000 !"));
