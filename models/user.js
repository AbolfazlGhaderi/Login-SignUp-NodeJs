const mongoose = require('mongoose');


const Users = mongoose.model('Users', new mongoose.Schema({

    userName:{
        type:String,
        required:true,
        trim: true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim: true
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true,
        trim: true
    },
    password:{
        type:String,
        required:true
        
    },
    dateCreated:{
        type:Date,
        default:Date.now
    },
})
)

const Otps = mongoose.model('OTPs', new mongoose.Schema({

    email:{
        type:String,
        required:true,
        trim: true
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now 
      },


})
)


module.exports={Users,Otps}
