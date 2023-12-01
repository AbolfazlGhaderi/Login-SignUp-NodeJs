const { validationResult } = require('express-validator');
const { Users } = require('../models/user');
const bcryptjs = require('bcryptjs');

// ---------------------- GET ----------------------

exports.getSingin = (req, res) => {
    const errSingin = req.flash("errSingin"); // []
    res.render('../views/Singin.ejs', {
        errSingin,
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

exports.getDashboard=(req,res) =>{
    const successSingin = req.flash('successSingin')

    res.render('../views/Admin/Dashboard.ejs',{
        successSingin
    });
}
// ---------------------- Post ----------------------

exports.postSingUp = async (req, res) => {

    // -------------- validator -----------------------------------------
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
    //--------------- Search in DB And Save Data -------------------------

    const email = req.body.email
    const phoneNumber = req.body.phoneNumber
    const password = req.body.password

    //--------------- Search With Email --------------------------------------

    await Users.findOne({ email: email }).then(result => {
        if (result) {
            const errSingup = req.flash("errSingup", "این ایمیل قبلا ثبت نام شده است!");
            return res.redirect('/singup')
        }

        //----------- Search With PhoneNumber ------------------------------

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
                //-------------- Save Data ---------------------

                user.save().then(() => {
                    res.redirect('/singin')
                }).catch(err => console.log(err))
            })



        }).catch(err => console.log(err))



    }).catch(err => console.log(err))


}

exports.postSingIn = (req, res) => {

    // -------------- validator -----------------------------------------
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.mapped());
        return res.render('../views/Singin.ejs', {
            errors: errors.mapped(),
            errSingin: [],
            oldItemSIN: {
                email: req.body.email,
                password: req.body.password
            }
        })

        //-------------------- Test With Postman -----------------
        // res.json(errors.mapped());
    }
    const email = req.body.email
    const password = req.body.password

    //--------------- Search in DB  -------------------------
    const user = Users.findOne({ email: email })
        .then(result => {
            if (!result) {
                const errSingin = req.flash('errSingin', ' کاربر مورد نظر یافت نشد. لطفا در وارد کردن اطلاعات کنید ❤️')
                return res.redirect('singin')
            }
             //--------------- Compare Password And Activities  -------------------------

            bcryptjs.compare(password, result.password).then(isMatch => {
                if (!isMatch) {
                    const errSingin = req.flash('errSingin', ' پسورد اشتباه است ، لطفا دقت کنید 🔐')
                    return res.redirect('singin')
                }
               //--------------- Activities -------------------------

                const successSingin = req.flash('successSingin','😎❤️ با موفقیت وارد شدید ')
                console.log(successSingin[0]);
                res.redirect('/Admin/Dashboard')

                //---------------------------------------------------

            }).catch(err=>console.log(err))

        }).catch(err=>console.log(err))

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


