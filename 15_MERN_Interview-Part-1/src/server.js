/**
   PS:1 How can a nodeJS app effectively serve the large files , 400MB video or text file but without exhausting the the server's RAM  and cache resources.

   solution:  streaming
 */

const fs = require('fs');
const http = require('http');

const server = http.createServer();

server.on('request', (req, res)=>{
    // fs.readFile('./src/big.file', (err, data)=>{
    //     if(err) throw err;
    //     res.end(data);
    // })

    const fileReadStream = fs.createReadStream('./src/big.file');
    fileReadStream.pipe(res); // res is a writable stream

    // const fileReadStream = fs.createReadStream('./src/big.file');
    // fileReadStream.pipe(res);
})


server.listen(3000, () => {
    console.log('server statrted at 3000')
});


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



// const http = require('http');
// const fs = require('fs');
// const path = require('path');

// const server = http.createServer();

// // code for reading stream

// const filePath = path.join(__dirname, 'big.file');
// console.log(filePath);

// const fileReadStream = fs.createReadStream(filePath);
// const fileWriteStream = fs.createWriteStream('copyOfbig.file');

// // fileReadStream.on('data', (chunk)=> {
// //     console.log(`Recieved ${chunk.length} bytes of data`);
// //     fileWriteStream.write(chunk);
// // })

// // fileReadStream.on('end', ()=>{
// //     fileWriteStream.end();
// //     console.log('End of reading a file')
// // });

// // try {

// //     fileReadStream.on('data', (chunk)=> {
// //     console.log(`Recieved ${chunk.length} bytes of data`);
// // })
    
// // } catch (error) {
// //     console.log('Error in reading the file', error);
// // }

//   //fileReadStream.pipe(fileWriteStream);

// fileReadStream.on('error', (error)=>{
//     console.log("error", error);
// })

// fileWriteStream.on('error', (error)=>{
//     console.log("error", error);
// })

// server.listen(3000, ()=>{
//     console.log('Server is running on 3000')
// })


