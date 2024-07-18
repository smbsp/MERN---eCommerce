// models/UserModel.js
const mongoose = require('mongoose');

// schema-> structure and validation 
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    confirmPassword: {
        type: String,
        required: true,
        minlength: 8,
        validate: function () {
            return this.password === this.confirmPassword
        }
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    otp: {
        type: String
    },
    otpExpiry: {
       type: Date
    },
    role: {
        type: String,
        default: 'user'
    }
});

// this model -> will have queries 
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
