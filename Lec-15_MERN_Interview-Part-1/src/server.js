/**
   PS:1 How can a nodeJS app effectively serve the large files , 400MB video or text file but without exhausting the the server's RAM  and cache resources.

   solution:  streaming
 */

// const fs = require('fs');
// const http = require('http');

// const server = http.createServer();

// server.on('request', (req, res)=>{
//     fs.readFile('./big.file', (err, data)=>{
//         if(err) throw err;
//         res.end(data);
//     })
// })


// server.listen(3000, () => {
//     console.log('server statrted at 3000')
// })


/**

   PS2: There are certain tasks that are CPU intensive such as image processing , video encoding etc

   we will taking an exmaple of fibonacci computation

   solution: sign up anew process(child process) to delegate the request to node server

 */


// const express = require('express');
// const cors = require('cors');

// const app = express();

// app.use(cors());


// const calculateFib = (num) => {
//     if(num<=1) return num;

//     return calculateFib(num-1) + calculateFib(num-2);
// }

// app.get('/fib', (req, res)=> {

//     const {number, requestNumber} = req.query;

//     console.log("handler fn ran for req", requestNumber);

//     if(!number || isNaN(number) || number <=0){
//         return res.status(400).json({error: 'Please provide a positive number'})
//     }

//     const ans = calculateFib(number);

//     res.status(200).json({
//         status: "success",
//         message: ans,
//         requestNumber
//     });
// })



const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer();

// code for reading stream

const filePath = path.join(__dirname, '', 'big.file');

console.log(filePath);

const readableStream = fs.createReadStream(filePath);

readableStream.on('data', (chunk)=> {
    console.log(`Recieved ${chunk.length} bytes of data`);
})

readableStream.on('end', ()=>{
    console.log('End of reading a file')
;})


server.listen(3000, ()=>{
    console.log('Server is running on 3000')
})


