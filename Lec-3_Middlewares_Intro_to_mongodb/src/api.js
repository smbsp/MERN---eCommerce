const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const { PORT, DB_USER, DB_PASSWORD } = process.env;

console.log(DB_USER, DB_PASSWORD);

const dbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.jdq8n60.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(dbURL).then((connection)=>{
    console.log('conection', connection);
    console.log('db is connected');
}).catch((err)=>{console.error(err)});