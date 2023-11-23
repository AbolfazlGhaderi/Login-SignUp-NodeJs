const mongoose = require('mongoose');


const Users = mongoose.model('Users', new mongoose.Schema({

    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    dateCreated:{
        type:Date,
        default:Date.now
    },
})
)

module.exports={Users}
