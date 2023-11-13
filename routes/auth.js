const express=require('express');
const router=express.Router();
const authRouter=require('../controllers/auth');

//-----------------------------------

router.get('/singin',authRouter.getSingin)

router.get('/singup',authRouter.getSingup)


module.exports=router;