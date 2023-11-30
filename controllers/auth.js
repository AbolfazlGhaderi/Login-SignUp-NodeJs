const { validationResult } = require('express-validator');
const { Users } = require('../models/user');
const bcryptjs = require('bcryptjs');
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
    const errSingup = req.flash("errSingup"); // []
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
            errSingup: [],
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
    //------------------- Search in DB And Save Data -------------------------

    const email = req.body.email
    const phoneNumber = req.body.phoneNumber
    const password = req.body.password

    //--------------- Search With Email --------------------------------------

    await Users.findOne({ email: email }).then(result => {
        if (result) {
            const errSingup = req.flash("errSingup", "این ایمیل قبلا ثبت نام شده است!");
            return res.redirect('/singup')
        }

      //--------------- Search With PhoneNumber ------------------------------

        Users.findOne({ phoneNumber: phoneNumber }).then(result => {

            if (result) {
                const errSingup = req.flash("errSingup", "این تلفن همراه قبلا ثبت نام شده است!");
                return res.redirect('/singup')
            }
          //-------------- Password encryption By bcryptjs ---------------------
            bcryptjs.hash(password, 13).then(passHashed => {
                const user = new Users({
                    userName: req.body.userName,
                    email: email,
                    phoneNumber: phoneNumber,
                    password: passHashed
                });

                user.save().then(() => {
                    res.redirect('/singin')
                }).catch(err => console.log(err))
            })



        }).catch(err => console.log(err))



    }).catch(err => console.log(err))


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
    return saveUser.save().then(() => {
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


