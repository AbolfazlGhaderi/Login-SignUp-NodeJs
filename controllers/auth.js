
const {validationResult} =require('express-validator');
// ---------------------- GET ----------------------
exports.getSingin = (req,res)=>{
    
    res.render('../views/Singin.ejs')
}

exports.getSingup = (req,res)=>{
    // let successAddProduct=req.flash("successAddProduct","test");
    res.render('../views/Singup.ejs',{
        errors:null
    })
}

// ---------------------- Post ----------------------


exports.postSingUp =  (req,res)=>{
   
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors.mapped() );
        return res.render('../views/Singup.ejs',{
            errors:errors.mapped() 
        })
    }
    console.log(req.body);
   res.json(req.body);
}




