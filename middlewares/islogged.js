exports.islogged=(req,res,next)=>{
    const islogged =req.cookies.islogged;
    if(islogged=="true"){
        const successSingin = req.flash('successSingin')
         return res.redirect('/admin/dashboard')
 
    }

    next()

}