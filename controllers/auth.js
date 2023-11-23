const bodyParser = require('body-parser');
const jdate =require('jalali-date');
const {check,validationResult} = require('express-validator');
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
    const body = req.body;

    console.log(body);

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors.array()[0].msg);

        return res.render('../views/Singup.ejs',{
            validateError:errors.array()[0].msg
        })
    }
    res.json(body)
}
