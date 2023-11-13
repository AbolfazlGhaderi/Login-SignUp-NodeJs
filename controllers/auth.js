const jdate =require('jalali-date');



exports.getSingin = (req,res)=>{

    res.render('../views/Singin.ejs')
}

exports.getSingup = (req,res)=>{

    res.render('../views/Singup.ejs')
}
