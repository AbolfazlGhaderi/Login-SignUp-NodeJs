const express=require('express');
const router=express.Router();
const authRouter=require('../controllers/auth');

const {check,validationResult} = require('express-validator');

// ---------------------- GET ----------------------

router.get('/singin',authRouter.getSingin)

router.get('/singup',authRouter.getSingup)

// ---------------------- Post ----------------------

router.post('/singup',authRouter.postSingUp)



module.exports=router;