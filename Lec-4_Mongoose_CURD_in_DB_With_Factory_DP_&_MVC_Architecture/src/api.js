const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');

const app = express();

dotenv.config();
const { PORT, DB_USER, DB_PASSWORD } = process.env;
// console.log(DB_USER);

const dbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.jdq8n60.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(dbURL).then((connection)=>{
    // console.log('conection', connection);
    console.log('db is connected');
}).catch((err)=>{console.error(err)});

const schemaObject = {
   name:{
    type: String,
    required: true
   },

   email: {
     type: String,
     required: true,
     unique: true,
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
}

const userSchema = new mongoose.Schema(schemaObject);

const UserModel = mongoose.model("UserModel", userSchema);
console.log(UserModel);
// console.log(UserModel.create());

const createUser = async(req, res) => {
    try {

        let user = await UserModel.create(req.body);
        console.log(req.body);
        res.status(200).json({
            user
        });

    } catch(error) {
       res.status(500).json({message: 'Internal Server Error'});
    }
}

app.use(express.json());
app.post('/api/users', createUser);

const port = PORT;

app.listen(port, ()=>{
    console.log(`Server is listening on ${PORT}`)
});

/**
    What are the problems you will be facing?

    1. Code is tightly coupled.
    2. all the business logics will be in a single file.

       To Solve the above problems, we have to follow the design patterns:

       1. MVC DP.
       2. Factory DP.
 */



