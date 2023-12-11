const express = require('express');
const router = express.Router();
const authRouter = require('../controllers/auth');

const { check, body } = require('express-validator');
const {islogged} = require('../middlewares/islogged')

// ---------------------- GET ------------------------------------------
router.get('/', islogged,authRouter.getHome)

router.get('/singin', islogged,authRouter.getSingin)

router.get('/singup',islogged, authRouter.getSingup)

router.get('/singinOTP',islogged,authRouter.getSingInOTP)

router.get('/Admin/Dashboard',authRouter.getDashboard)

// ---------------------- Post ----------------------------------------------------

router.post('/singin', [
    body('email').isEmail().withMessage("ایمیل را با دقت وارد کنید"),
    body('password'," فیلد پسور خالی است / پسورد باید ترکیبی از حروف کوچک و بزرگ ، سیمبل ها و اعداد باشد / بیشتر از 8 حرف باشد").isLength({ min: 3 }).isStrongPassword(
        { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }
    ),

], authRouter.postSingIn)

router.post('/singup', [
    body('userName').isLength({ min: 3 }).withMessage(" فیلد نام کاربری خالی است / تعداد حروف  باید از 3 حرف بیشتر باشد "),
    body('email').isEmail().withMessage("ایمیل را با دقت وارد کنید"),
    body('phoneNumber',' فیلد تلفن همراه خالی است /  تعداد ارقام تلفن همراه باید 11 رقم باشد و فقط عدد وارد بشود').isLength({ min: 11, max: 11 }).isInt(),
    body('password'," فیلد پسور خالی است / پسورد باید ترکیبی از حروف کوچک و بزرگ ، سیمبل ها و اعداد باشد / بیشتر از 8 حرف باشد").isLength({ min: 3 }).isStrongPassword(
        { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }
    ),

], authRouter.postSingUp)

router.post('/singinOTP', [
    body('email').isEmail().withMessage("ایمیل را با دقت وارد کنید")

], authRouter.postSingInOTP)

module.exports = router;