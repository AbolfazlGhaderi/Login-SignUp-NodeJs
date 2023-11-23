const express=require('express');
const router=express.Router();
const authRouter=require('../controllers/auth');
const {check,validationResult} = require('express-validator');

// ---------------------- GET ----------------------

router.get('/singin',authRouter.getSingin)

router.get('/singup',authRouter.getSingup)

// ---------------------- Post ----------------------

router.post('/singup',[
    check('username',"  کادر یوزرنیم خالی است یا تعداد حروف آن کمتر از 3 تا است").exists().isLength({min:3}),
    check('email','ایمیل وارد شده نامعتبر میباشد').isEmail().normalizeEmail(),

]
,authRouter.postSingup)



module.exports=router;