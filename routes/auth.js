const express=require('express');
const router=express.Router();
const authRouter=require('../controllers/auth');
const {check,validationResult} = require('express-validator');

<<<<<<< HEAD

=======
>>>>>>> 5f2a199f6b66f6b8b7fe4048eee24e7e6ea7923f
// ---------------------- GET ----------------------

router.get('/singin',authRouter.getSingin)

router.get('/singup',authRouter.getSingup)

// ---------------------- Post ----------------------

<<<<<<< HEAD
router.post('/singup',authRouter.postSingup)
=======
router.post('/singup',[
    check('username',"  کادر یوزرنیم خالی است یا تعداد حروف آن کمتر از 3 تا است").exists().isLength({min:3}),
    check('email','ایمیل وارد شده نامعتبر میباشد').isEmail().normalizeEmail(),

]
,authRouter.postSingup)
>>>>>>> 5f2a199f6b66f6b8b7fe4048eee24e7e6ea7923f



module.exports=router;