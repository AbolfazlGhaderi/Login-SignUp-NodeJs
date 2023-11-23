const bodyParser = require('body-parser');
const {validateSingUp} = require('../validations/userValidation');
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

exports.postSingUp = async (req,res)=>{
    // const body = req.body;
    // console.log(body);

    // const {error,value}=validateSingUp(body,{ebortErly:false});
    // if(error){
    //     console.log(error);
    //     return res.send(error.detals);
    // }
    const body = await req.body 
   console.log(req.body);

   res.json(req.body);
}


