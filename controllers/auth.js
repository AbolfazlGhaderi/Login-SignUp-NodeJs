const { validationResult } = require('express-validator');
const { Users } = require('../models/user');
// ---------------------- GET ----------------------

exports.getSingin = (req, res) => {

    res.render('../views/Singin.ejs', {
        errors: null,
        oldItemSIN: {
            email: null,
            password: null
        }
    })
}

exports.getSingup = (req, res) => {
    const errSingup=req.flash("errSingup"); // []
    res.render('../views/Singup.ejs', {
        errSingup,
        errors: null,
        oldItemSUP: {
            userName: null,
            email: null,
            phoneNumber: null,
            password: null
        }
    })
}

exports.getSingInOTP = (req, res) => {
    res.render('../views/SinginOTP.ejs', {
        step1: false,
        errors: null,
        oldItemSINOTP: {
            phoneNumber: null
        }
    })
}
// ---------------------- Post ----------------------

exports.postSingUp = async (req, res) => {

    // ---------- validator --------------------
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.mapped());
        return res.render('../views/Singup.ejs', {
            errSingup:[],
            errors: errors.mapped(),
            oldItemSUP: {
                userName: req.body.userName,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                password: req.body.password
            }
        })
        //-------------------- Test With Postman -----------------
        // res.json(errors.mapped());
    }
    //----------- Search in DB -------------------------
    const email=req.body.email 
    await Users.findOne({ email:email }).then(result => {
        console.log(result);
        console.log(email);
        if (result) {
            const errSingup=req.flash("errSingup","این ایمیل قبلا ثبت نام شده است!");
             return res.redirect('/singup')
        }
        console.log(req.body);
        res.json(req.body);

    })


}

exports.postSingIn = (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.mapped());
        return res.render('../views/Singin.ejs', {
            errors: errors.mapped(),
            oldItemSIN: {
                email: req.body.email,
                password: req.body.password
            }
        })

        //-------------------- Test With Postman -----------------
        // res.json(errors.mapped());
    }

    const saveUser = new Users({
        userName: req.body.userName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password
    })
    return saveUser.save().then(()=>{
        res.redirect('/singin')
    })


    console.log(req.body);
    //    res.json(req.body);
}

exports.postSingInOTP = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.mapped());
        return res.render('../views/SinginOTP.ejs', {
            errors: errors.mapped(),
            oldItemSINOTP: {
                phoneNumber: req.body.phoneNumber
            }
        })

        //-------------------- Test With Postman -----------------
        // res.json(errors.mapped());
    }
}


