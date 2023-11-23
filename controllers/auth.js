const bodyParser = require('body-parser');
const jdate =require('jalali-date');
<<<<<<< HEAD

=======
const {check,validationResult} = require('express-validator');
>>>>>>> 5f2a199f6b66f6b8b7fe4048eee24e7e6ea7923f
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
<<<<<<< HEAD

=======
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
>>>>>>> 5f2a199f6b66f6b8b7fe4048eee24e7e6ea7923f
}
