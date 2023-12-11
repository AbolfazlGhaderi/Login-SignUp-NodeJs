const { validationResult, Result } = require('express-validator');
const { Users, Otps } = require('../models/user');
const bcryptjs = require('bcryptjs');
const emailjs = require('@emailjs/nodejs');
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
    const errSinginOTP = req.flash("errSinginOTP");
    res.render('../views/SinginOTP.ejs', {
        errSinginOTP,
        step2: false,
        errors: null,
        oldItemSINOTP: {
            phoneNumber: null
        }
    })
}

exports.getDashboard = (req, res) => {
    const successSingin = req.flash('successSingin')

    res.render('../views/Admin/Dashboard.ejs', {
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
                const errSingin = req.flash('errSingin', ' کاربر مورد نظر یافت نشد. لطفا در وارد کردن اطلاعات دقت کنید ❤️')
                return res.redirect('singin')
            }
            //--------------- Compare Password And Activities  -------------------------

            bcryptjs.compare(password, result.password).then(isMatch => {
                if (!isMatch) {
                    const errSingin = req.flash('errSingin', ' پسورد اشتباه است ، لطفا دقت کنید 🔐')
                    return res.redirect('singin')
                }
                //--------------- Activities -------------------------

                const successSingin = req.flash('successSingin', '😎❤️ با موفقیت وارد شدید ')
                // console.log(successSingin[0]);
                res.redirect('/Admin/Dashboard')

                //---------------------------------------------------

            }).catch(err => console.log(err))

        }).catch(err => console.log(err))

}

exports.postSingInOTP = async (req, res) => {

    // -------------- validator -----------------------------------------

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // console.log(errors.mapped());
        return res.render('../views/SinginOTP.ejs', {
            errSinginOTP: [],
            step2: false,
            errors: errors.mapped(),
            oldItemSINOTP: {
                email: req.body.email
            }
        })
    }

    const { email } = req.body;

    //--------------- Control Flow  -------------------------
    
    if (!req.body.otp) {

        //--------------- Search in DB  -------------------------
        await Users.findOne({ email: email }).then(async result => {

            //--------------- If the EMAIL  not  already exist  -------------------------
            if (!result) {
                const errSinginOTP = req.flash('errSinginOTP', ' کاربر مورد نظر یافت نشد. لطفا در وارد کردن اطلاعات دقت کنید ❤️')
                return res.redirect('singinotp')
            }

            await Otps.findOne({ email: email }).then(async result => {

                //--------------- If the CODE  already exists  -------------------------

                if (result) {
                    await Otps.findByIdAndDelete(result._id).catch(err => {
                        console.log(err);
                    })
                }

                //--------------- Generate OTP Code  -------------------------
                const otpCode = Math.floor(Math.random() * (99999 - 10000)) + 10000

                //--------------- Mail Options -------------------------

                const templateParams = {
                    'user_email': email,
                    'message': otpCode,
                };


                // --------------- Send Mail And Save OTPCode -------------------------

                emailjs
                    .send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, {
                        publicKey: 'YOUR_PUBLIC_KEY',
                        privateKey: 'YOUR_PRIVATE_KEY',
                    })
                    .then(
                        (response) => {
                            console.log(`SUCCESS! Send to  : ${email} / ${otpCode} `
                                , response.status, response.text);
                            //--------------- Save OTP in DB -------------------------
                            const otp = new Otps({
                                email: email,
                                otp: otpCode
                            })
                            otp.save().then(() => {
                                return res.render('../views/SinginOTP.ejs', {
                                    error: null,
                                    step2: true,
                                    item: req.body.email
                                })
            
                            }).catch(err => console.log(err))

                        },

                        //----------- Handel Error Send Email ------------------------

                        err => {
                            console.log(err);
                            const errSinginOTP = req.flash('errSinginOTP', ' ارسال ایمیل با مشکلاتی روبرو شده است . لطفا لحظاتی دیگر امتحان کنید')
                            return res.redirect('singinotp')
                        }
                    )

            }).catch(err => console.log(err))


        }).catch(err => console.log(err))
    }


    else {
        //----------------- Search Code in DB --------------------

        const userINFO = await Otps.findOne({ email: email, otp: req.body.otp })
        if (!userINFO) return res.render('../views/SinginOTP.ejs', {
            error: "کد وارد شده اشتباه میباشد !",
            step2: true,
            item: req.body.email
        });

        //----------------- Delete Code in DB --------------------  

        const deletedUser = await Otps.findByIdAndDelete(userINFO._id);
        if (!deletedUser) return console.log("خطایی رخ داده است !");

         //----------------- Login --------------------

        const successSingin = req.flash('successSingin', '😎❤️ با موفقیت وارد شدید ')
        // console.log(successSingin[0]);
        return res.redirect('/Admin/Dashboard')
    }


}


