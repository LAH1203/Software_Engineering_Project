const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    Email: {
        type:String,
        required:true,
        unique: true
    },
    Password: {
        type:String,
        required:true
    },
    Name: {
        type:String,
        required:true
    },
    Phone_number: {
        type:String,
        required:true
    },
    Mode: {
        type: int,
        required:true
    }
});

const User = mongoose.model('User', UserSchema );
module.exports = User;
