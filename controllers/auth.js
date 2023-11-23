const bodyParser = require('body-parser');
const jdate =require('jalali-date');

// ---------------------- GET ----------------------
exports.getSingin = (req,res)=>{
    
    res.render('../views/Singin.ejs')
}

exports.getSingup = (req,res)=>{
    // let successAddProduct=req.flash("successAddProduct","test");
    res.render('../views/Singup.ejs',{
        validateError:''
    })
}

// ---------------------- Post ----------------------

exports.postSingup =(req,res)=>{

}
