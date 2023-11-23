


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
   
    console.log(req.body);
   res.json(req.body);
}




