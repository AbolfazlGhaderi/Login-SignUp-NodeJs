const express=require('express');
const router=express.Router();
const authRouter=require('../controllers/auth');


// ---------------------- GET ----------------------

router.get('/singin',authRouter.getSingin)

router.get('/singup',authRouter.getSingup)

// ---------------------- Post ----------------------





module.exports=router;