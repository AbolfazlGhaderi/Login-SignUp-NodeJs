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
        type:Number,
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 30, //  automatically deleted after 1 minutes of its creation time
      },
})
)

module.exports={Users,Otps}
