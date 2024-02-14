const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : {type:String,required:true},
    email : {type:String,required:true},
    password : {type: String,required:true},
    address : {type: String,required:true},
    number : {type: Number,required:true},
    photoURL: {type: String,required:true},
    panURL : {type: String,required:true},
    aadharURL : {type: String,required:true},
    status : {type: String,required:true},
    score : {type: String,required:true},
})

module.exports = mongoose.model('User',userSchema);