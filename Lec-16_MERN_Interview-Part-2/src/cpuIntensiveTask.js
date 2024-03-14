/**
   PS2: There are certain tasks that are CPU intensive such as image processing , video encoding etc

   we will taking an exmaple of fibonacci computation

   solution: sign up anew process(child process) to delegate the request to node server
 */


const express = require('express');
const cors = require('cors');

const app = express();

const { fork } = require("child_process");
const path = require('path');

app.use(cors());


/**



 */

app.get('/fib', (req, res)=> {
    const {number, requestNumber} = req.query;

    console.log("handler fn ran for req", requestNumber);

    if(!number || isNaN(number) || number <=0){
        return res.status(400).json({error: 'Please provide a positive number'})
    }

    //const ans = calculateFibonacci(number);
   
    // res.status(200).json({
    //     status: "success",
    //     message: ans,
    //     requestNumber
    // });

    // creating a child process
    const fiboRes = fork(path.join(__dirname, 'fiboWorker.js'));

    // sending the data to child process
    fiboRes.send({number: parseInt(number, 10)});

    // recieving the data from the child process
    fiboRes.on("message", (answer)=>{

       res.status(200).json({
            status: "success",
            data: answer,
            requestNumber
        }); 

    })


});

app.listen(3001, ()=>{
    console.log('Server is running on 3001')
})

