const express = require("express");
const app = express();

const bodyParser=require('body-parser');
const path =require('path');

//----------- Set Views ------------------

app.set("view engin", "ejs");
app.set("views", "views");

//----------- Middlewares ----------------

app.use(bodyParser.urlencoded({extended:false}))
app.use("/assets",express.static(path.join(__dirname,'public')))

//-----------------


app.get("/", (req, res) => {
  res.send("Hello World !");
});

app.listen(3000, console.log("App is Runing in port 3000 !"));
