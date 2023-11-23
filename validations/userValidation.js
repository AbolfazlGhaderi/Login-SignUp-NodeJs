const joi = require("joi");

const validation =(schema) => (paylod)=>{
    schema.validate(paylod,{ebortEarly:false})}


const userValidationSchema = joi.object({
    userName : joi.string().min(3).required().label("User Nameeesssss"),
    email:joi.string().email().required(),
    phoneNumber:joi.string().min(11).max(11).required(),
    password:joi.string().min(3).required()
})
exports.validateSingUp=validation(userValidationSchema);