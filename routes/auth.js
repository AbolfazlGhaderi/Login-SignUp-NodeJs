const express=require('express');
const router=express.Router();
const authRouter=require('../controllers/auth');

const {check} = require('express-validator');

// ---------------------- GET ----------------------

router.get('/singin',authRouter.getSingin)

router.get('/singup',authRouter.getSingup)

// ---------------------- Post ----------------------

router.post('/singup',[
    check('userName').isLength({min:3}).withMessage(" فیلد نام کاربری خالی است / تعداد حروف  باید از 3 حرف بیشتر باشد "),
    check('email').isEmail().withMessage("ایمیل را با دقت وارد کنید"),
    check('phoneNumber').isLength({min:11,max:11}).isInt().withMessage(" فیلد تلفن همراه خالی است / یا تعداد ارقام تلفن همراه باید 11 رقم باشد / عدد باید وارد کنید"),
    check('password').isLength({min:3}).withMessage("فیلد خالی است / تعداد حروف پسورد باید از 3 حرف بیشتر باشد "),

],authRouter.postSingUp)



module.exports=router;