const joi = require("joi");

const validation =(schema) => async (paylod)=>{
    await schema.validate(paylod,{ebortEarly:false})}


const userValidationSchema = joi.object({
    userName : joi.string().min(3,'طول عبارت وارد شده  باید از 3 بیشتر باشد').required(),
    email:joi.string().email('ایمیل خود را به درستی وارد کنید ').required(),
    phoneNumber:joi.string().min(11).max(11).required().message('شماره موبایل ، 11 رقم باید باشد'),
    password:joi.string().min(3,'طول عبارت وارد شده  باید از 3 بیشتر باشد').required()
})
exports.validateSingUp=validation(userValidationSchema);