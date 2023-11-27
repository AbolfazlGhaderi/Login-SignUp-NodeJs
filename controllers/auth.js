
const {validationResult} =require('express-validator');
// ---------------------- GET ----------------------
exports.getSingin = (req,res)=>{
    
    res.render('../views/Singin.ejs',{
        errors:null,
        oldItemSIN :{
            email:null,
            password:null
        }
    })
}

exports.getSingup = (req,res)=>{
    // let successAddProduct=req.flash("successAddProduct","test");
    res.render('../views/Singup.ejs',{
        errors:null,
        oldItemSUP:{
            userName:null,
            email:null,
            phoneNumber:null,
            password:null
        }
    })
}

// ---------------------- Post ----------------------


exports.postSingUp =  (req,res)=>{
   
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors.mapped() );
        return res.render('../views/Singup.ejs',{
            errors:errors.mapped() ,
            oldItemSUP:{
                userName:req.body.userName,
                email:req.body.email,
                phoneNumber:req.body.phoneNumber,
                password:req.body.password
            }
        })
        //-------------------- Test With Postman -----------------
        // res.json(errors.mapped());
    }
    console.log(req.body);
//    res.json(req.body);
}

exports.postSingIn =  (req,res)=>{
   
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors.mapped() );
        return res.render('../views/Singin.ejs',{
            errors:errors.mapped() ,
            oldItemSIN:{
                email:req.body.email,
                password:req.body.password
            }
        })

      //-------------------- Test With Postman -----------------
           // res.json(errors.mapped());
    }
    console.log(req.body);
//    res.json(req.body);
}


