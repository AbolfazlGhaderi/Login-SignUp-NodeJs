exports.islogged=(req,res,next)=>{
    if(req.session.islogged){
        const successSingin = req.flash('successSingin')
         return res.redirect('/admin/dashboard')
 
    }
    next()

}