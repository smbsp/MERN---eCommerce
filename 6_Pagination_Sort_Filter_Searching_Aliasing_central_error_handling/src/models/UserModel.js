const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
   name:{
    type: String,
    required: true
   },

   email: {
     type: String,
     required: true,
     unique: false,
   },

   password: {
     type: String,
     required: true,
     minlength: 8
   },

   confirmPassword: {
     type: String,
     required: true,
     minlength: 8,
     validate: function() {
        return this.password === this.confirmPassword
     }
   },

   createdAt: {
    type: Date,
    default: Date.now()
   }
});

const UserModel = mongoose.model("UserModel", userSchema);

module.exports = UserModel;